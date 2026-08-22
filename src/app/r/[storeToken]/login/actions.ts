"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { setVerifiedCustomer } from "@/lib/customer-auth";

export type FormState = { error?: string };

export async function customerLoginAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const storeToken = String(formData.get("storeToken") ?? "");
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const host = await db.host.findUnique({ where: { storeToken } });
  if (!host) return { error: "Shop not found. / 店舗が見つかりません。" };

  if (!email) {
    return { error: "Please enter your email address. / メールアドレスを入力してください。" };
  }

  const customer = await db.customer.findUnique({
    where: { hostId_email: { hostId: host.id, email } },
  });
  if (!customer) {
    return {
      error:
        "This email address is not registered. Please contact the shop. / このメールアドレスは登録されていません。店舗にお問い合わせください。",
    };
  }

  await setVerifiedCustomer(customer.id, host.id);
  redirect(`/r/${storeToken}/vehicle`);
}
