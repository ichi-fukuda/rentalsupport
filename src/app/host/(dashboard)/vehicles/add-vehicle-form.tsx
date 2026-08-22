"use client";

import { useActionState } from "react";
import { createVehicleAction, type FormState } from "./actions";

const initialState: FormState = {};

export function AddVehicleForm() {
  const [state, action, pending] = useActionState(createVehicleAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
      <h2 className="font-semibold">車両を追加</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            車種名
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="例：トヨタ プリウス"
            className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-950"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-medium">
            分類
          </label>
          <input
            id="category"
            name="category"
            placeholder="例：ハイブリッドセダン"
            className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-950"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="year" className="text-sm font-medium">
            年式
          </label>
          <input
            id="year"
            name="year"
            type="number"
            defaultValue={new Date().getFullYear()}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-950"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fuelType" className="text-sm font-medium">
            燃料タイプ
          </label>
          <select
            id="fuelType"
            name="fuelType"
            className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-950"
          >
            <option value="gasoline">ガソリン</option>
            <option value="hybrid">ハイブリッド</option>
            <option value="ev">EV（電気自動車）</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="controlsJa" className="text-sm font-medium">
          運転席まわりの操作（日本語、箇条書き推奨）
        </label>
        <textarea
          id="controlsJa"
          name="controlsJa"
          rows={4}
          placeholder="例：パワースイッチはブレーキを踏みながら押す、シフトレバーは..."
          className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-950"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="fuelGuideJa" className="text-sm font-medium">
          給油・充電方法（日本語）
        </label>
        <textarea
          id="fuelGuideJa"
          name="fuelGuideJa"
          rows={3}
          placeholder="例：レギュラーガソリン使用、給油口は運転席側後方..."
          className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-zinc-950"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {pending ? "追加中…" : "車両を追加"}
      </button>
    </form>
  );
}
