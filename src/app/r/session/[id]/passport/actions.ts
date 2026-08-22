"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { saveUploadedImage } from "@/lib/uploads";
import { nextStepPath } from "@/lib/rental-flow";
import { getNationality } from "@/lib/nationality";

export type FormState = { error?: string };

export async function submitPassportAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const sessionId = String(formData.get("sessionId") ?? "");
  const session = await db.rentalSession.findUnique({
    where: { id: sessionId },
    include: { host: true, customer: true },
  });
  if (!session) return { error: "Session not found." };

  let photoPath: string | null;
  try {
    photoPath = await saveUploadedImage(formData.get("file"), session.hostId, session.id);
  } catch (err) {
    return { error: (err as Error).message };
  }
  if (!photoPath) return { error: "Please choose a photo." };

  const requiresPassport = getNationality(session.customer.nationality).requiresPassport;
  const path = nextStepPath(session.host, sessionId, "PASSPORT_SUBMITTED", requiresPassport);
  const status = path.endsWith("/done") ? "READY_FOR_KEY" : "PASSPORT_SUBMITTED";
  await db.rentalSession.update({
    where: { id: sessionId },
    data: { status, passportPhotoPath: photoPath },
  });
  redirect(path);
}
