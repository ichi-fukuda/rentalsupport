"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { getVehicle } from "@/lib/vehicles";

function ExplainSection({
  vehicleId,
  kind,
  heading,
  buttonLabel,
}: {
  vehicleId: string;
  kind: "controls" | "fuel";
  heading: string;
  buttonLabel: string;
}) {
  const { lang, t } = useLanguage();
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setExplanation(null);
    try {
      const res = await fetch("/api/vehicle-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId, kind, lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? t("errorGeneric"));
      }
      setExplanation(data.explanation);
    } catch (err) {
      setError((err as Error).message || t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">{heading}</h2>
      <button
        onClick={handleClick}
        disabled={loading}
        className="self-start rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {loading ? t("manualLoading") : buttonLabel}
      </button>
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}
      {explanation && (
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {explanation}
        </div>
      )}
    </div>
  );
}

export default function VehicleDetailPage() {
  const params = useParams<{ id: string }>();
  const { t } = useLanguage();
  const vehicle = getVehicle(params.id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <Link href="/vehicles" className="text-sm underline">
          ← {t("vehicleBack")}
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{vehicle.name}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {vehicle.category}
        </p>
      </div>

      <ExplainSection
        vehicleId={vehicle.id}
        kind="controls"
        heading={t("controlsHeading")}
        buttonLabel={t("vehicleExplainButton")}
      />
      <ExplainSection
        vehicleId={vehicle.id}
        kind="fuel"
        heading={t("fuelHeading")}
        buttonLabel={t("vehicleFuelButton")}
      />
    </div>
  );
}
