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
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
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
          className="rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/15 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={loading || !manualText.trim()}
          className="self-start rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {loading ? t("manualLoading") : t("manualSubmit")}
        </button>
      </form>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      {explanation && (
        <div className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
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
