"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";

export async function completeRentalAction(formData: FormData): Promise<void> {
  const host = await requireSessionHost();
  const id = String(formData.get("id") ?? "");

  const session = await db.rentalSession.findUnique({ where: { id } });
  if (session && session.hostId === host.id) {
    await db.rentalSession.update({
      where: { id },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
  }
  revalidatePath("/host/rentals");
}
