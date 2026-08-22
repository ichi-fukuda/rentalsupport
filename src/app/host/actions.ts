"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";

export type FormState = { error?: string };

export async function signupAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const shopName = String(formData.get("shopName") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const contractedVehicles = Number(formData.get("contractedVehicles") ?? "1");
  const options = formData.getAll("options").map(String);

  if (!shopName) return { error: "店舗名を入力してください。" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "有効なメールアドレスを入力してください。" };
  }
  if (password.length < 8) {
    return { error: "パスワードは8文字以上で入力してください。" };
  }
  if (!Number.isFinite(contractedVehicles) || contractedVehicles < 1) {
    return { error: "契約台数は1以上の数値を入力してください。" };
  }

  const existing = await db.host.findUnique({ where: { email } });
  if (existing) {
    return { error: "このメールアドレスは既に登録されています。" };
  }

  const passwordHash = await hashPassword(password);
  await db.host.create({
    data: {
      shopName,
      email,
      passwordHash,
      contractedVehicles: Math.floor(contractedVehicles),
      options: options.join(","),
    },
  });

  redirect(`/host/signup/complete?shop=${encodeURIComponent(shopName)}&email=${encodeURIComponent(email)}`);
}

export async function loginAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  const host = await db.host.findUnique({ where: { email } });
  if (!host || !(await verifyPassword(password, host.passwordHash))) {
    return { error: "メールアドレスまたはパスワードが正しくありません。" };
  }

  await createSession(host.id);
  redirect("/host/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/host/login");
}
