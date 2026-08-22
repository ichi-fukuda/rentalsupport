import { requireSessionHost } from "@/lib/auth";
import { ManualForm } from "./manual-form";

export default async function HostManualPage() {
  const host = await requireSessionHost();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">貸出マニュアル</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          ここに登録した内容は、店頭QRを読み込んだ利用者にAIが多言語で要約・説明します。
        </p>
      </div>
      <ManualForm initialText={host.manualText} />
    </div>
  );
}
