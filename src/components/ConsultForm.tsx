"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const revenueOptions = [
  "아직 거의 없음",
  "월 100만원 미만",
  "월 100~300만원",
  "월 300~500만원",
  "월 500만원 이상",
];

const goalOptions = [
  "월 500만원 안정 돌파",
  "월 1,000만원 이상",
  "고마진 수동 소싱 체력 만들기",
  "아직 목표를 못 정했음",
];

export default function ConsultForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const required: [string, string][] = [
      ["name", "이름"],
      ["email", "이메일"],
      ["phone", "연락처"],
      ["store", "스토어 주소"],
      ["detail", "답답한 점"],
    ];
    const missing = required.filter(([k]) => !String(data[k] ?? "").trim());
    if (missing.length) {
      setStatus("error");
      setMessage(`${missing.map(([, l]) => l).join(", ")}을(를) 입력해 주세요.`);
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "요청을 처리하지 못했어요.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "잠시 후 다시 시도해 주세요.");
    }
  }

  if (status === "ok") {
    return (
      <div className="reveal flex flex-col items-start gap-4 border border-amber/40 bg-paper-dim/50 p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber text-2xl text-amber">
          ✓
        </span>
        <h3 className="display text-2xl">지원서가 도착했어요</h3>
        <p className="text-ink-soft">
          48시간 이내에 지원서를 선별해, 선정 결과를 적어주신 이메일로
          연락드립니다. 매달 세 명만 선발합니다.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="tick underline underline-offset-4"
        >
          다시 작성하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="이름" htmlFor="name">
          <input id="name" name="name" required autoComplete="name" className={inputCls} placeholder="홍길동" />
        </Field>
        <Field label="이메일" htmlFor="email">
          <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@company.com" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="연락처" htmlFor="phone">
          <input id="phone" name="phone" required inputMode="tel" autoComplete="tel" className={inputCls} placeholder="010-0000-0000" />
        </Field>
        <Field label="현재 월 매출" htmlFor="revenue">
          <select id="revenue" name="revenue" className={inputCls} defaultValue="">
            <option value="" disabled>선택해 주세요</option>
            {revenueOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="스토어 주소" htmlFor="store">
          <input id="store" name="store" required inputMode="url" className={inputCls} placeholder="smartstore.naver.com/..." />
        </Field>
        <Field label="목표 매출" htmlFor="goal">
          <select id="goal" name="goal" className={inputCls} defaultValue="">
            <option value="" disabled>선택해 주세요</option>
            {goalOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <Field label="지금 가장 답답한 점 · 이 클리닉을 지원하는 이유" htmlFor="detail">
        <textarea id="detail" name="detail" required rows={5} className={`${inputCls} resize-y`} placeholder="지금 운영 방식(닥등/수동), 마진율, 무엇이 막혀 있는지, 주당 실행 가능한 시간, 왜 지금 정밀 처방이 필요한지 구체적으로 적어주세요. 자세할수록 선발에 유리합니다." />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm text-amber-deep">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex items-center justify-center bg-ink px-6 py-3.5 font-medium text-paper transition-colors hover:bg-amber disabled:opacity-60"
      >
        {status === "sending" ? "보내는 중…" : "지원서 보내기"}
      </button>
      <p className="tick">
        보내주신 내용은 선발·상담 목적에만 쓰이고, 요청 시 즉시 삭제해 드려요.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-none border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition-colors focus:border-ink";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="tick">{label}</span>
      {children}
    </label>
  );
}
