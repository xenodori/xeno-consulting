import "server-only";
import { cache } from "react";
import { neon } from "@neondatabase/serverless";
import { defaults, type SiteContent } from "./content";

// 콘텐츠는 Neon(Postgres)에 JSON 한 덩어리로 저장한다.
// DATABASE_URL 이 없으면(로컬/미설정) 항상 기본값을 쓰므로 사이트는 그대로 동작한다.

const DB_URL = process.env.DATABASE_URL;

/** 저장된 값(부분)을 기본값 위에 얕게 병합 — 새 필드가 추가돼도 안전 */
function merge(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved || typeof saved !== "object") return defaults;
  return { ...defaults, ...saved };
}

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS site_content (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)`;

/** 공개 페이지에서 사용 — 요청당 1회만 DB 조회(React cache) */
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!DB_URL) return defaults;
  try {
    const sql = neon(DB_URL);
    await sql.query(CREATE_TABLE);
    const rows = (await sql.query(
      "SELECT data FROM site_content WHERE id = 1",
    )) as { data: Partial<SiteContent> }[];
    return merge(rows[0]?.data);
  } catch (err) {
    console.error("[site-content] 조회 실패, 기본값 사용", err);
    return defaults;
  }
});

/** 관리자 저장 — 기본값과 다른 항목만 저장(sparse)해서, 코드 기본값 변경이 반영되도록 한다. */
export async function saveContent(data: SiteContent): Promise<void> {
  if (!DB_URL) throw new Error("DATABASE_URL 이 설정되어 있지 않습니다.");
  const sparse: Record<string, unknown> = {};
  for (const key of Object.keys(defaults) as (keyof SiteContent)[]) {
    if (JSON.stringify(data[key]) !== JSON.stringify(defaults[key])) {
      sparse[key] = data[key];
    }
  }
  const sql = neon(DB_URL);
  await sql.query(CREATE_TABLE);
  await sql.query(
    `INSERT INTO site_content (id, data, updated_at)
     VALUES (1, $1::jsonb, now())
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [JSON.stringify(sparse)],
  );
}

/** DB 저장값을 지워 코드 기본값으로 되돌린다. */
export async function resetContent(): Promise<void> {
  if (!DB_URL) return;
  const sql = neon(DB_URL);
  await sql.query(CREATE_TABLE);
  await sql.query("DELETE FROM site_content WHERE id = 1");
}
