"use client";

import { useState } from "react";
import { t, type LangCode } from "@/lib/i18n";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function AccidentChat({
  vehicleId,
  rentalSessionId,
  lang,
}: {
  vehicleId: string;
  rentalSessionId?: string;
  lang: LangCode;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportSent, setReportSent] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/car-accident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId, messages: nextMessages, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t(lang, "errorGeneric"));
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError((err as Error).message || t(lang, "errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  async function handleSendReport() {
    if (messages.length === 0 || reportLoading) return;
    setReportLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/car-accident/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId, rentalSessionId, messages, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t(lang, "errorGeneric"));
      setReportSent(true);
    } catch (err) {
      setError((err as Error).message || t(lang, "errorGeneric"));
    } finally {
      setReportLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
        {messages.length === 0 && <p className="text-sm text-zinc-400">—</p>}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "self-end rounded-2xl rounded-br-sm bg-foreground px-4 py-2 text-sm text-background"
                : "self-start whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-2 text-sm dark:bg-zinc-800"
            }
          >
            {m.content}
          </div>
        ))}
        {loading && <p className="text-sm text-zinc-400">{t(lang, "accidentThinking")}</p>}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t(lang, "accidentInputPlaceholder")}
          className="flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {t(lang, "accidentSend")}
        </button>
      </form>

      {messages.length > 0 && (
        <button
          onClick={handleSendReport}
          disabled={reportLoading || reportSent}
          className="self-start rounded-full border border-black/15 px-5 py-2 text-sm font-medium hover:bg-black/5 disabled:opacity-50 dark:border-white/15 dark:hover:bg-white/10"
        >
          {reportSent
            ? t(lang, "shareReportSent")
            : reportLoading
              ? "…"
              : t(lang, "shareReportButton")}
        </button>
      )}
    </div>
  );
}
