"use client";

import { useActionState } from "react";
import { updateSettingsAction, type FormState } from "./actions";
import type { Host } from "@/generated/prisma/client";

const initialState: FormState = {};

export function SettingsForm({ host }: { host: Host }) {
  const [state, action, pending] = useActionState(updateSettingsAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="agreementText" className="text-sm font-medium">
          同意書テキスト（日本語、AIが多言語に翻訳して表示します）
        </label>
        <textarea
          id="agreementText"
          name="agreementText"
          rows={8}
          defaultValue={host.agreementText}
          placeholder="例：貸出期間中の事故・違反は借主の責任となります。..."
          className="rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/15 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="requireLicensePhoto"
            defaultChecked={host.requireLicensePhoto}
          />
          貸出時に運転免許証の写真登録を必須にする
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="requireDamagePhotos"
            defaultChecked={host.requireDamagePhotos}
          />
          貸出時に車の傷確認写真の撮影を必須にする
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="accidentNotes" className="text-sm font-medium">
          事故対応AIへの追加指示（自店舗の緊急連絡先・手順など）
        </label>
        <textarea
          id="accidentNotes"
          name="accidentNotes"
          rows={5}
          defaultValue={host.accidentNotes}
          placeholder="例：事故発生時は当店緊急ダイヤル 00-0000-0000 にも必ず連絡するよう伝えてください。"
          className="rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/15 dark:bg-zinc-900"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="self-start rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {pending ? "保存中…" : "保存"}
        </button>
        {state.saved && (
          <span className="text-sm text-green-700 dark:text-green-400">保存しました</span>
        )}
      </div>
    </form>
  );
}
