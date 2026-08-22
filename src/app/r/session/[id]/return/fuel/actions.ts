"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function confirmFuelAction(formData: FormData): Promise<void> {
  const sessionId = String(formData.get("sessionId") ?? "");
  const session = await db.rentalSession.findUnique({ where: { id: sessionId } });
  if (!session) return;

  await db.rentalSession.update({ where: { id: sessionId }, data: { fuelConfirmed: true } });
  redirect(`/r/session/${sessionId}/return/photos`);
}
