import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LANGUAGES } from "@/lib/i18n";
import { startRentalAction } from "./actions";

export default async function StoreLandingPage({
  params,
}: {
  params: Promise<{ storeToken: string }>;
}) {
  const { storeToken } = await params;
  const host = await db.host.findUnique({
    where: { storeToken },
    include: { vehicles: { orderBy: { createdAt: "asc" } } },
  });

  if (!host) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <p className="text-sm text-zinc-500">{host.shopName}</p>
        <h1 className="text-2xl font-bold">Rent a car / この店舗でレンタカーを借りる</h1>
      </div>

      {host.vehicles.length === 0 ? (
        <p className="text-sm text-red-600">
          この店舗はまだ車両を登録していません。スタッフにお問い合わせください。
        </p>
      ) : (
        <form action={startRentalAction} className="flex flex-col gap-5">
          <input type="hidden" name="storeToken" value={host.storeToken} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lang" className="text-sm font-medium">
              Language / 言語
            </label>
            <select
              id="lang"
              name="lang"
              defaultValue="ja"
              className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="vehicleId" className="text-sm font-medium">
              Vehicle / 車両
            </label>
            <select
              id="vehicleId"
              name="vehicleId"
              required
              className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"
            >
              {host.vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}（{v.category}）
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="self-start rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Start / 開始する
          </button>
        </form>
      )}
    </div>
  );
}
