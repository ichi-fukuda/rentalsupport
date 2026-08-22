"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { nextStepPath } from "@/lib/rental-flow";
import { getNationality } from "@/lib/nationality";

export async function agreeAction(formData: FormData): Promise<void> {
  const sessionId = String(formData.get("sessionId") ?? "");
  const session = await db.rentalSession.findUnique({
    where: { id: sessionId },
    include: { host: true, customer: true },
  });
  if (!session) return;

  const requiresPassport = getNationality(session.customer.nationality).requiresPassport;
  const path = nextStepPath(session.host, sessionId, "AGREED", requiresPassport);
  const status = path.endsWith("/done") ? "READY_FOR_KEY" : "AGREED";
  await db.rentalSession.update({ where: { id: sessionId }, data: { status } });
  redirect(path);
}
