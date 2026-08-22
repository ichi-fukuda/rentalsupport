"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isLangCode } from "@/lib/i18n";
import { nextStepPath } from "@/lib/rental-flow";
import { getNationality } from "@/lib/nationality";
import { getVerifiedCustomerId, clearVerifiedCustomer } from "@/lib/customer-auth";

export async function startRentalAction(formData: FormData): Promise<void> {
  const storeToken = String(formData.get("storeToken") ?? "");
  const vehicleId = String(formData.get("vehicleId") ?? "");
  const langRaw = String(formData.get("lang") ?? "ja");
  const lang = isLangCode(langRaw) ? langRaw : "ja";

  const host = await db.host.findUnique({ where: { storeToken } });
  if (!host) redirect("/");

  const customerId = await getVerifiedCustomerId(host.id);
  if (!customerId) redirect(`/r/${storeToken}/login`);

  const vehicle = await db.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle || vehicle.hostId !== host.id) {
    redirect(`/r/${storeToken}/vehicle`);
  }

  const customer = await db.customer.findUnique({ where: { id: customerId } });
  if (!customer) redirect(`/r/${storeToken}/login`);

  const session = await db.rentalSession.create({
    data: { hostId: host.id, vehicleId: vehicle.id, customerId: customer.id, lang, status: "STARTED" },
  });
  await clearVerifiedCustomer();

  const requiresPassport = getNationality(customer.nationality).requiresPassport;
  redirect(nextStepPath(host, session.id, "STARTED", requiresPassport));
}
