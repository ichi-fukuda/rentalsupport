import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";
import { generateQrDataUrl, getBaseUrl } from "@/lib/qr";
import { deleteVehicleAction } from "../actions";
import { EditVehicleForm } from "./edit-vehicle-form";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const host = await requireSessionHost();
  const vehicle = await db.vehicle.findUnique({ where: { id } });

  if (!vehicle || vehicle.hostId !== host.id) {
    notFound();
  }

  const baseUrl = await getBaseUrl();
  const carUrl = `${baseUrl}/car/${vehicle.qrToken}`;
  const qrDataUrl = await generateQrDataUrl(carUrl);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">{vehicle.name}</h2>

      <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="font-semibold">車内貼付用QRコード</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          印刷して車内に貼ってください。利用者がスキャンすると運転席の説明を多言語で確認できます。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="車両QRコード" width={200} height={200} />
        <a
          href={qrDataUrl}
          download={`${vehicle.name}-qr.png`}
          className="self-start text-sm underline"
        >
          QRコードをダウンロード
        </a>
        <p className="break-all text-xs text-zinc-400">{carUrl}</p>
      </div>

      <EditVehicleForm vehicle={vehicle} />

      <form action={deleteVehicleAction}>
        <input type="hidden" name="id" value={vehicle.id} />
        <button
          type="submit"
          className="rounded-full border border-red-300 px-5 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
        >
          この車両を削除
        </button>
      </form>
    </div>
  );
}
