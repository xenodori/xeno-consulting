import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

// 지원서를 받을 곳(구글 시트 Apps Script 웹훅).
// 환경변수 CONSULT_WEBHOOK_URL 로 언제든 교체 가능.
const WEBHOOK =
  process.env.CONSULT_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbwBJQa9h5ckguo3_VdY3sVHyF090IvKk2APC2r8FUMCgnrXhtHIYUE5t6H_0FsqMmP6/exec";

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청이에요." }, { status: 400 });
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160);
  const phone = clean(payload.phone, 40);
  const store = clean(payload.store, 200);
  const detail = clean(payload.detail);

  if (!name || !detail) {
    return NextResponse.json(
      { error: "이름과 문제 내용을 적어주세요." },
      { status: 422 },
    );
  }
  if (!phone || !store) {
    return NextResponse.json(
      { error: "연락처와 스토어 주소를 적어주세요." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "이메일 형식을 확인해 주세요." },
      { status: 422 },
    );
  }

  const record = {
    name,
    email,
    phone,
    store,
    revenue: clean(payload.revenue, 40),
    goal: clean(payload.goal, 40),
    package: clean(payload.package, 40),
    detail,
    receivedAt: new Date().toISOString(),
  };

  // 1순위: 웹훅으로 전송 (운영 환경 · Vercel)
  if (WEBHOOK) {
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[consult] 웹훅 전송 실패", err);
      return NextResponse.json(
        { error: "지금은 접수가 어려워요. 잠시 후 다시 시도해 주세요." },
        { status: 502 },
      );
    }
  }

  // 웹훅 미설정 시(로컬 개발): 파일로 적재
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "consults.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  } catch (err) {
    console.error("[consult] 저장 실패", err);
    return NextResponse.json(
      { error: "지금은 접수가 어려워요. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
