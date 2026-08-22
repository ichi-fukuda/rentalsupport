import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";
import { completeRentalAction } from "./actions";

const STATUS_LABELS: Record<string, string> = {
  STARTED: "開始（車両選択済み）",
  AGREED: "同意書 同意済み",
  PASSPORT_SUBMITTED: "パスポート登録済み",
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
    include: { vehicle: true, customer: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">貸出履歴</h2>
        <p className="mt-1 text-sm text-muted">
          店頭QRから始まった貸出セッションの一覧です。返却手続き後、車の状態を確認して「完了」にしてください。
        </p>
      </div>

      {sessions.length === 0 && (
        <p className="text-sm text-muted">貸出履歴はまだありません。</p>
      )}

      <div className="flex flex-col gap-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 card"
          >
            <div>
              <span className="font-medium">{s.vehicle.name}</span>
              <span className="ml-2 text-sm text-muted">{s.customer.name}</span>
              <span className="ml-2 text-xs text-muted">
                {s.createdAt.toLocaleString("ja-JP")}
              </span>
              <div className="text-sm text-muted">
                {STATUS_LABELS[s.status] ?? s.status}
              </div>
            </div>
            {s.status === "RETURN_SUBMITTED" && (
              <form action={completeRentalAction}>
                <input type="hidden" name="id" value={s.id} />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
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
