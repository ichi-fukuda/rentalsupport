import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";
import { languageLabel, isLangCode } from "@/lib/i18n";
import { acknowledgeAccidentAction } from "./actions";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default async function HostAccidentsPage() {
  const host = await requireSessionHost();
  const reports = await db.accidentReport.findMany({
    where: { hostId: host.id },
    include: { vehicle: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">事故レポート</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          AIが利用者からヒアリングした内容の構造化レポートです。内容を確認し、必要に応じて保険会社へ連絡・転送してください。
        </p>
      </div>

      {reports.length === 0 && (
        <p className="text-sm text-zinc-400">事故レポートはまだありません。</p>
      )}

      <div className="flex flex-col gap-4">
        {reports.map((r) => {
          let transcript: ChatMessage[] = [];
          try {
            transcript = JSON.parse(r.transcript);
          } catch {
            transcript = [];
          }
          return (
            <div
              key={r.id}
              className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold">{r.vehicle.name}</span>
                  <span className="ml-2 text-xs text-zinc-500">
                    {r.createdAt.toLocaleString("ja-JP")} ・{" "}
                    {isLangCode(r.lang) ? languageLabel(r.lang) : r.lang}
                  </span>
                </div>
                <span
                  className={
                    r.status === "NEW"
                      ? "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300"
                      : "rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }
                >
                  {r.status === "NEW" ? "未確認" : "確認済み"}
                </span>
              </div>

              <div className="whitespace-pre-wrap rounded-lg bg-zinc-50 p-3 text-sm dark:bg-zinc-950">
                {r.summary}
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer text-zinc-500">
                  ヒアリングのやり取りを見る（{transcript.length}件）
                </summary>
                <div className="mt-2 flex flex-col gap-2">
                  {transcript.map((m, i) => (
                    <div key={i} className="text-xs">
                      <span className="font-medium">
                        {m.role === "user" ? "利用者" : "AI"}:
                      </span>{" "}
                      {m.content}
                    </div>
                  ))}
                </div>
              </details>

              {r.status === "NEW" && (
                <form action={acknowledgeAccidentAction} className="self-start">
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-black/15 px-4 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    確認済みにする
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
