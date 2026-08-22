"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { saveUploadedImage } from "@/lib/uploads";

export type FormState = { error?: string };

export async function submitReturnPhotosAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const sessionId = String(formData.get("sessionId") ?? "");
  const session = await db.rentalSession.findUnique({ where: { id: sessionId } });
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
  if (paths.length === 0) return { error: "Please add at least one photo." };

  await db.rentalSession.update({
    where: { id: sessionId },
    data: { status: "RETURN_SUBMITTED", returnPhotoPaths: paths.join(",") },
  });
  redirect(`/r/session/${sessionId}/return/done`);
}
