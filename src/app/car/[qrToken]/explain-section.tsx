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
    <div className="flex flex-col gap-3 card">
      <h2 className="text-lg font-semibold">{heading}</h2>
      <button
        onClick={handleClick}
        disabled={loading}
        className="btn btn-primary self-start"
      >
        {loading ? t(lang, "manualLoading") : buttonLabel}
      </button>
      {error && (
        <p className="error-box">
          {error}
        </p>
      )}
      {explanation && (
        <div className="whitespace-pre-wrap text-sm leading-relaxed">{explanation}</div>
      )}
    </div>
  );
}
