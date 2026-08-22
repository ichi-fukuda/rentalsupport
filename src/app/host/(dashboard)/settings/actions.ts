"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";

export type FormState = { error?: string; saved?: boolean };

export async function updateSettingsAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const host = await requireSessionHost();

  const agreementText = String(formData.get("agreementText") ?? "");
  const accidentNotes = String(formData.get("accidentNotes") ?? "");
  const requireLicensePhoto = formData.get("requireLicensePhoto") === "on";
  const requireDamagePhotos = formData.get("requireDamagePhotos") === "on";

  await db.host.update({
    where: { id: host.id },
    data: { agreementText, accidentNotes, requireLicensePhoto, requireDamagePhotos },
  });

  revalidatePath("/host/settings");
  return { saved: true };
}
