import type { Metadata } from "next";
import { defaults } from "@/lib/content";
import { getContent } from "@/lib/site-content";
import { isAuthed, login, logout, save } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "관리자", robots: { index: false } };

const LABELS: Record<string, string> = {
  program: "프로그램 (제목·가격·배지·진행방식)",
  pain: "① 문제 제기",
  consultant: "② 컨설턴트 소개",
  book: "저서",
  timeline: "연혁",
  cases: "③ 성공 사례",
  casesClaim: "사례 상단 문구",
  compareRows: "④ 가치 제안 표",
  roadmap: "⑤ 커리큘럼",
  deliverables: "⑥ 제공 항목",
  qualify: "⑦ 지원 자격",
  process: "신청 절차",
  roi: "ROI 문구",
  seatsRemaining: "남은 자리 배너",
  priceNotice: "가격 인상 예고",
  valueStack: "가치 스택",
  valueTotal: "합산 가치",
  bonuses: "보너스",
  guarantee: "리스크 리버설",
  faqs: "FAQ",
};

const inputCls =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const authed = await isAuthed();

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5">
        <h1 className="text-xl font-semibold text-neutral-900">관리자 로그인</h1>
        <p className="mt-2 text-sm text-neutral-500">사이트 텍스트를 수정하려면 비밀번호를 입력하세요.</p>
        <form action={login} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            autoFocus
            className={inputCls}
          />
          <button className="rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white">
            로그인
          </button>
        </form>
        {sp.e === "badpw" && <p className="mt-3 text-sm text-red-600">비밀번호가 올바르지 않습니다.</p>}
        {sp.e === "noenv" && (
          <p className="mt-3 text-sm text-red-600">
            ADMIN_PASSWORD 환경변수가 설정되지 않았습니다. Vercel 설정에서 추가하세요.
          </p>
        )}
        {sp.e === "auth" && <p className="mt-3 text-sm text-red-600">세션이 만료되었습니다. 다시 로그인하세요.</p>}
      </main>
    );
  }

  const content = await getContent();

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">사이트 내용 편집</h1>
        <form action={logout}>
          <button className="text-sm text-neutral-500 underline">로그아웃</button>
        </form>
      </div>

      {sp.ok === "1" && (
        <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          저장되었습니다. 홈페이지에 반영됐어요. (새로고침으로 확인)
        </p>
      )}
      {sp.e === "json" && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          “{sp.f}” 항목의 형식(JSON)이 올바르지 않아 저장하지 못했습니다. 따옴표·쉼표·대괄호를 확인하세요.
        </p>
      )}
      {sp.e === "save" && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          저장에 실패했습니다. DATABASE_URL 환경변수가 설정돼 있는지 확인하세요.
        </p>
      )}

      <p className="mt-4 text-sm text-neutral-500">
        일반 문구는 그대로 고치면 되고, 목록(JSON) 항목은 <b>따옴표와 쉼표를 그대로 유지</b>하며 내용만 바꾸세요.
      </p>

      <form action={save} className="mt-8 flex flex-col gap-8">
        {Object.keys(defaults).map((key) => {
          const dv = (defaults as Record<string, unknown>)[key];
          const cur = (content as Record<string, unknown>)[key];
          const isString = typeof dv === "string";
          return (
            <div key={key} className="flex flex-col gap-2">
              <label htmlFor={key} className="text-sm font-semibold text-neutral-900">
                {LABELS[key] ?? key}
                {!isString && <span className="ml-2 text-xs font-normal text-neutral-400">목록(JSON)</span>}
              </label>
              {isString ? (
                <textarea
                  id={key}
                  name={key}
                  rows={2}
                  defaultValue={String(cur ?? "")}
                  className={`${inputCls} resize-y`}
                />
              ) : (
                <textarea
                  id={key}
                  name={key}
                  rows={Math.min(24, JSON.stringify(cur, null, 2).split("\n").length + 1)}
                  defaultValue={JSON.stringify(cur, null, 2)}
                  className={`${inputCls} resize-y font-mono text-xs`}
                  spellCheck={false}
                />
              )}
            </div>
          );
        })}

        <div className="sticky bottom-4 flex gap-3">
          <button className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-lg">
            저장하기
          </button>
          <a
            href="/"
            target="_blank"
            className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700"
          >
            사이트 미리보기 ↗
          </a>
        </div>
      </form>
    </main>
  );
}
