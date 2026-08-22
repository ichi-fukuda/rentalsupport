import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionHost } from "@/lib/auth";
import { logoutAction } from "../actions";

export default async function HostDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = await getSessionHost();
  if (!host) {
    redirect("/host/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4 dark:border-white/10">
        <div>
          <p className="text-xs text-zinc-500">ホスト管理画面</p>
          <h1 className="text-xl font-bold">{host.shopName}</h1>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/host/dashboard" className="hover:underline">
            ダッシュボード
          </Link>
          <Link href="/host/vehicles" className="hover:underline">
            車両管理
          </Link>
          <Link href="/host/manual" className="hover:underline">
            マニュアル
          </Link>
          <Link href="/host/settings" className="hover:underline">
            ステップ設定
          </Link>
          <Link href="/host/store-qr" className="hover:underline">
            店頭QR
          </Link>
          <Link href="/host/accidents" className="hover:underline">
            事故レポート
          </Link>
          <Link href="/host/rentals" className="hover:underline">
            貸出履歴
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-zinc-500 hover:underline">
              ログアウト
            </button>
          </form>
        </nav>
      </div>
      {children}
    </div>
  );
}
