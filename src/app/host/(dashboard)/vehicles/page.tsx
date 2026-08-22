import Link from "next/link";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";
import { AddVehicleForm } from "./add-vehicle-form";

export default async function HostVehiclesPage() {
  const host = await requireSessionHost();
  const vehicles = await db.vehicle.findMany({
    where: { hostId: host.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">車両管理</h2>
        <p className="mt-1 text-sm text-muted">
          {vehicles.length} / {host.contractedVehicles} 台（契約台数）
        </p>
      </div>

      {vehicles.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {vehicles.map((v) => (
            <Link
              key={v.id}
              href={`/host/vehicles/${v.id}`}
              className="flex flex-col gap-1 card-hover"
            >
              <span className="font-semibold">{v.name}</span>
              <span className="text-sm text-muted">
                {v.category} ・ {v.year}年
              </span>
            </Link>
          ))}
        </div>
      )}

      <AddVehicleForm />
    </div>
  );
}
