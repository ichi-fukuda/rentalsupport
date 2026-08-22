import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";
import { completeRentalAction } from "./actions";

const STATUS_LABELS: Record<string, string> = {
  STARTED: "開始（車両選択済み）",
  AGREED: "同意書 同意済み",
  LICENSE_SUBMITTED: "免許登録済み",
  DAMAGE_CHECKED: "傷確認済み",
  READY_FOR_KEY: "鍵引き渡し待ち",
  IN_PROGRESS: "貸出中",
  RETURN_SUBMITTED: "返却手続き済み（店頭確認待ち）",
  COMPLETED: "完了",
};

export default async function HostRentalsPage() {
  const host = await requireSessionHost();
  const sessions = await db.rentalSession.findMany({
    where: { hostId: host.id },
    include: { vehicle: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">貸出履歴</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          店頭QRから始まった貸出セッションの一覧です。返却手続き後、車の状態を確認して「完了」にしてください。
        </p>
      </div>

      {sessions.length === 0 && (
        <p className="text-sm text-zinc-400">貸出履歴はまだありません。</p>
      )}

      <div className="flex flex-col gap-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900"
          >
            <div>
              <span className="font-medium">{s.vehicle.name}</span>
              <span className="ml-2 text-xs text-zinc-500">
                {s.createdAt.toLocaleString("ja-JP")}
              </span>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {STATUS_LABELS[s.status] ?? s.status}
              </div>
            </div>
            {s.status === "RETURN_SUBMITTED" && (
              <form action={completeRentalAction}>
                <input type="hidden" name="id" value={s.id} />
                <button
                  type="submit"
                  className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
                >
                  車両確認完了にする
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
