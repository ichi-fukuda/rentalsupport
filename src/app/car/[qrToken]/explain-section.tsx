"use client";

import { useState } from "react";
import { t, type LangCode } from "@/lib/i18n";

export function ExplainSection({
  vehicleId,
  kind,
  heading,
  buttonLabel,
  lang,
}: {
  vehicleId: string;
  kind: "controls" | "fuel";
  heading: string;
  buttonLabel: string;
  lang: LangCode;
}) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setExplanation(null);
    try {
      const res = await fetch("/api/car-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId, kind, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t(lang, "errorGeneric"));
      setExplanation(data.explanation);
    } catch (err) {
      setError((err as Error).message || t(lang, "errorGeneric"));
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
        {loading ? t(lang, "manualLoading") : buttonLabel}
      </button>
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}
      {explanation && (
        <div className="whitespace-pre-wrap text-sm leading-relaxed">{explanation}</div>
      )}
    </div>
  );
}
