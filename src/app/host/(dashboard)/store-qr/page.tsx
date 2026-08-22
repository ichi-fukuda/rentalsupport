import { requireSessionHost } from "@/lib/auth";
import { generateQrDataUrl, getBaseUrl } from "@/lib/qr";

export default async function StoreQrPage() {
  const host = await requireSessionHost();
  const baseUrl = await getBaseUrl();
  const storeUrl = `${baseUrl}/r/${host.storeToken}`;
  const qrDataUrl = await generateQrDataUrl(storeUrl);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold">店頭QRコード</h2>
        <p className="mt-1 text-sm text-muted">
          印刷してカウンターに設置してください。利用者がこのQRコードを読み込むと、同意書・免許登録・傷確認のステップが始まります。
        </p>
      </div>
      <div className="flex flex-col items-start gap-3 card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="店頭QRコード" width={280} height={280} />
        <a href={qrDataUrl} download="store-qr.png" className="text-sm underline">
          QRコードをダウンロード
        </a>
        <p className="break-all text-xs text-muted">{storeUrl}</p>
      </div>
    </div>
  );
}
