"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { VEHICLES } from "@/lib/vehicles";

export default function VehiclesPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{t("vehiclesPageTitle")}</h1>
        <p className="mt-2 text-sm text-muted">
          {t("vehiclesPageDesc")}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {VEHICLES.map((v) => (
          <Link
            key={v.id}
            href={`/vehicles/${v.id}`}
            className="flex flex-col gap-1 card-hover"
          >
            <span className="text-lg font-semibold">{v.name}</span>
            <span className="text-sm text-muted">
              {v.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
