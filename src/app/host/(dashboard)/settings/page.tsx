import { requireSessionHost } from "@/lib/auth";
import { SettingsForm } from "./settings-form";

export default async function HostSettingsPage() {
  const host = await requireSessionHost();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">ステップ設定</h2>
        <p className="mt-1 text-sm text-muted">
          店頭での貸出フローに必要なステップをカスタマイズできます。
        </p>
      </div>
      <SettingsForm host={host} />
    </div>
  );
}
