import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { LANGUAGES } from "@/lib/i18n";
import { getVerifiedCustomerId } from "@/lib/customer-auth";
import { startRentalAction } from "./actions";

export default async function VehicleSelectPage({
  params,
}: {
  params: Promise<{ storeToken: string }>;
}) {
  const { storeToken } = await params;
  const host = await db.host.findUnique({
    where: { storeToken },
    include: { vehicles: { orderBy: { createdAt: "asc" } } },
  });
  if (!host) notFound();

  const customerId = await getVerifiedCustomerId(host.id);
  if (!customerId) redirect(`/r/${storeToken}/login`);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <p className="text-sm text-muted">{host.shopName}</p>
        <h1 className="text-2xl font-bold">Select your vehicle / 車両を選択</h1>
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
              className="field-input"
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
              className="field-input"
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
            className="btn btn-primary self-start"
          >
            Start / 開始する
          </button>
        </form>
      )}
    </div>
  );
}
