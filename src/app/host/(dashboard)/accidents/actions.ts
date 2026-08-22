"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";

export async function acknowledgeAccidentAction(formData: FormData): Promise<void> {
  const host = await requireSessionHost();
  const id = String(formData.get("id") ?? "");

  const report = await db.accidentReport.findUnique({ where: { id } });
  if (report && report.hostId === host.id) {
    await db.accidentReport.update({ where: { id }, data: { status: "ACKNOWLEDGED" } });
  }
  revalidatePath("/host/accidents");
}
