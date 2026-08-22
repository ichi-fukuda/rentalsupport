"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";

export type FormState = { error?: string; saved?: boolean };

export async function updateManualAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const host = await requireSessionHost();
  const manualText = String(formData.get("manualText") ?? "");

  await db.host.update({ where: { id: host.id }, data: { manualText } });
  revalidatePath("/host/manual");
  return { saved: true };
}
