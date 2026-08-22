"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isLangCode } from "@/lib/i18n";
import { nextStepPath } from "@/lib/rental-flow";

export async function startRentalAction(formData: FormData): Promise<void> {
  const storeToken = String(formData.get("storeToken") ?? "");
  const vehicleId = String(formData.get("vehicleId") ?? "");
  const langRaw = String(formData.get("lang") ?? "ja");
  const lang = isLangCode(langRaw) ? langRaw : "ja";

  const host = await db.host.findUnique({ where: { storeToken } });
  if (!host) redirect("/");

  const vehicle = await db.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle || vehicle.hostId !== host.id) {
    redirect(`/r/${storeToken}`);
  }

  const session = await db.rentalSession.create({
    data: { hostId: host.id, vehicleId: vehicle.id, lang, status: "STARTED" },
  });

  redirect(nextStepPath(host, session.id, "STARTED"));
}
