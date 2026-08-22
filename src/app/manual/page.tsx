"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export default function ManualPage() {
  const { lang, t } = useLanguage();
  const [manualText, setManualText] = useState("");
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!manualText.trim()) return;
    setLoading(true);
    setError(null);
    setExplanation(null);
    try {
      const res = await fetch("/api/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manualText, lang }),
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
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">{t("manualPageTitle")}</h1>
        <p className="mt-2 text-sm text-muted">
          {t("manualPageDesc")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="manual" className="text-sm font-medium">
          {t("manualInputLabel")}
        </label>
        <textarea
          id="manual"
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          placeholder={t("manualInputPlaceholder")}
          rows={10}
          className="field-input"
        />
        <button
          type="submit"
          disabled={loading || !manualText.trim()}
          className="btn btn-primary self-start"
        >
          {loading ? t("manualLoading") : t("manualSubmit")}
        </button>
      </form>

      {error && (
        <p className="error-box">
          {error}
        </p>
      )}

      {explanation && (
        <div className="flex flex-col gap-2 card p-4">
          <h2 className="text-sm font-semibold text-muted">
            {t("manualResultTitle")}
          </h2>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
}
