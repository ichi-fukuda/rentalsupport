import Link from "next/link";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";

function StatCard({ label, value, href }: { label: string; value: number | string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 card-hover"
    >
      <span className="text-sm text-muted">{label}</span>
      <span className="text-3xl font-bold">{value}</span>
    </Link>
  );
}

export default async function HostDashboardPage() {
  const host = await requireSessionHost();

  const [vehicleCount, newAccidentCount, activeRentalCount] = await Promise.all([
    db.vehicle.count({ where: { hostId: host.id } }),
    db.accidentReport.count({ where: { hostId: host.id, status: "NEW" } }),
    db.rentalSession.count({
      where: { hostId: host.id, status: { notIn: ["COMPLETED"] } },
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={`登録車両数（契約台数 ${host.contractedVehicles}台）`}
          value={vehicleCount}
          href="/host/vehicles"
        />
        <StatCard label="未確認の事故レポート" value={newAccidentCount} href="/host/accidents" />
        <StatCard label="対応中の貸出" value={activeRentalCount} href="/host/rentals" />
      </div>

      <div className="card text-sm">
        <h2 className="mb-2 font-semibold">はじめに</h2>
        <ol className="list-inside list-decimal space-y-1 text-muted">
          <li>
            <Link href="/host/manual" className="underline">
              貸出マニュアル
            </Link>
            を登録する
          </li>
          <li>
            <Link href="/host/vehicles" className="underline">
              車両
            </Link>
            を登録し、各車のQRコードを発行してステッカーとして車内に貼る
          </li>
          <li>
            <Link href="/host/customers" className="underline">
              利用客
            </Link>
            のメールアドレスを事前登録する（お客様はこのメールアドレスでログインします）
          </li>
          <li>
            <Link href="/host/settings" className="underline">
              ステップ設定
            </Link>
            で同意書や必要なステップをカスタマイズする
          </li>
          <li>
            <Link href="/host/store-qr" className="underline">
              店頭QR
            </Link>
            を印刷してカウンターに設置する
          </li>
        </ol>
      </div>
    </div>
  );
}
