"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { saveUploadedImage } from "@/lib/uploads";
import { nextStepPath } from "@/lib/rental-flow";

export type FormState = { error?: string };

export async function submitDamageAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const sessionId = String(formData.get("sessionId") ?? "");
  const session = await db.rentalSession.findUnique({
    where: { id: sessionId },
    include: { host: true },
  });
  if (!session) return { error: "Session not found." };

  const files = formData.getAll("files");
  const paths: string[] = [];
  try {
    for (const file of files) {
      const p = await saveUploadedImage(file, session.hostId, session.id);
      if (p) paths.push(p);
    }
  } catch (err) {
    return { error: (err as Error).message };
  }

  const path = nextStepPath(session.host, sessionId, "DAMAGE_CHECKED");
  const status = path.endsWith("/done") ? "READY_FOR_KEY" : "DAMAGE_CHECKED";
  await db.rentalSession.update({
    where: { id: sessionId },
    data: { status, damagePhotoPaths: paths.join(",") },
  });
  redirect(path);
}
