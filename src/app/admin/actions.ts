"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createHash } from "node:crypto";
import { defaults } from "@/lib/content";
import { saveContent, resetContent } from "@/lib/site-content";

const COOKIE = "xeno_admin";

function token(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(`xeno::${pw}`).digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const c = await cookies();
  return c.get(COOKIE)?.value === token();
}

export async function login(formData: FormData): Promise<void> {
  const pw = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD) redirect("/admin?e=noenv");
  if (pw !== process.env.ADMIN_PASSWORD) redirect("/admin?e=badpw");
  const c = await cookies();
  c.set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
  redirect("/admin");
}

export async function save(formData: FormData): Promise<void> {
  if (!(await isAuthed())) redirect("/admin?e=auth");

  const next: Record<string, unknown> = {};
  for (const key of Object.keys(defaults)) {
    const raw = formData.get(key);
    if (raw == null) continue;
    const dv = (defaults as Record<string, unknown>)[key];
    if (typeof dv === "string") {
      next[key] = String(raw);
    } else {
      try {
        next[key] = JSON.parse(String(raw));
      } catch {
        redirect(`/admin?e=json&f=${encodeURIComponent(key)}`);
      }
    }
  }

  try {
    await saveContent({ ...defaults, ...next } as typeof defaults);
  } catch {
    redirect("/admin?e=save");
  }
  revalidatePath("/");
  redirect("/admin?ok=1");
}

export async function reset(): Promise<void> {
  if (!(await isAuthed())) redirect("/admin?e=auth");
  try {
    await resetContent();
  } catch {
    redirect("/admin?e=save");
  }
  revalidatePath("/");
  redirect("/admin?ok=reset");
}
