"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";

export type FormState = { error?: string };

export async function createCustomerAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const host = await requireSessionHost();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const nationality = String(formData.get("nationality") ?? "OTHER");

  if (!name) return { error: "氏名を入力してください。" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "有効なメールアドレスを入力してください。" };
  }

  const existing = await db.customer.findUnique({
    where: { hostId_email: { hostId: host.id, email } },
  });
  if (existing) {
    return { error: "このメールアドレスは既に登録されています。" };
  }

  await db.customer.create({ data: { hostId: host.id, name, email, nationality } });
  revalidatePath("/host/customers");
  redirect("/host/customers");
}

export async function deleteCustomerAction(formData: FormData): Promise<void> {
  const host = await requireSessionHost();
  const id = String(formData.get("id") ?? "");

  const customer = await db.customer.findUnique({ where: { id } });
  if (customer && customer.hostId === host.id) {
    await db.customer.delete({ where: { id } });
  }
  revalidatePath("/host/customers");
  redirect("/host/customers");
}
