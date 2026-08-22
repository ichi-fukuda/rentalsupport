"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { nextStepPath } from "@/lib/rental-flow";

export async function agreeAction(formData: FormData): Promise<void> {
  const sessionId = String(formData.get("sessionId") ?? "");
  const session = await db.rentalSession.findUnique({
    where: { id: sessionId },
    include: { host: true },
  });
  if (!session) return;

  const path = nextStepPath(session.host, sessionId, "AGREED");
  const status = path.endsWith("/done") ? "READY_FOR_KEY" : "AGREED";
  await db.rentalSession.update({ where: { id: sessionId }, data: { status } });
  redirect(path);
}
