"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";

export type FormState = { error?: string };

function readVehicleFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    year: Number(formData.get("year") ?? new Date().getFullYear()),
    fuelType: String(formData.get("fuelType") ?? "gasoline"),
    controlsJa: String(formData.get("controlsJa") ?? "").trim(),
    fuelGuideJa: String(formData.get("fuelGuideJa") ?? "").trim(),
  };
}

export async function createVehicleAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const host = await requireSessionHost();
  const fields = readVehicleFields(formData);

  if (!fields.name) return { error: "車種名を入力してください。" };
  if (!["gasoline", "hybrid", "ev"].includes(fields.fuelType)) {
    return { error: "燃料タイプが不正です。" };
  }

  const currentCount = await db.vehicle.count({ where: { hostId: host.id } });
  if (currentCount >= host.contractedVehicles) {
    return {
      error: `契約台数（${host.contractedVehicles}台）の上限に達しています。プランを変更してください。`,
    };
  }

  await db.vehicle.create({ data: { hostId: host.id, ...fields } });
  revalidatePath("/host/vehicles");
  redirect("/host/vehicles");
}

export async function updateVehicleAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const host = await requireSessionHost();
  const id = String(formData.get("id") ?? "");
  const fields = readVehicleFields(formData);

  if (!fields.name) return { error: "車種名を入力してください。" };

  const vehicle = await db.vehicle.findUnique({ where: { id } });
  if (!vehicle || vehicle.hostId !== host.id) {
    return { error: "車両が見つかりません。" };
  }

  await db.vehicle.update({ where: { id }, data: fields });
  revalidatePath(`/host/vehicles/${id}`);
  revalidatePath("/host/vehicles");
  return {};
}

export async function deleteVehicleAction(formData: FormData): Promise<void> {
  const host = await requireSessionHost();
  const id = String(formData.get("id") ?? "");

  const vehicle = await db.vehicle.findUnique({ where: { id } });
  if (vehicle && vehicle.hostId === host.id) {
    await db.vehicle.delete({ where: { id } });
  }
  revalidatePath("/host/vehicles");
  redirect("/host/vehicles");
}
