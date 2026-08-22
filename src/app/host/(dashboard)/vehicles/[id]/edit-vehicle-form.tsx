"use client";

import { useActionState } from "react";
import { updateVehicleAction, type FormState } from "../actions";
import type { Vehicle } from "@/generated/prisma/client";

const initialState: FormState = {};

export function EditVehicleForm({ vehicle }: { vehicle: Vehicle }) {
  const [state, action, pending] = useActionState(updateVehicleAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
      <input type="hidden" name="id" value={vehicle.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            車種名
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={vehicle.name}
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
            defaultValue={vehicle.category}
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
            defaultValue={vehicle.year}
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
            defaultValue={vehicle.fuelType}
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
          運転席まわりの操作（日本語）
        </label>
        <textarea
          id="controlsJa"
          name="controlsJa"
          rows={5}
          defaultValue={vehicle.controlsJa}
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
          defaultValue={vehicle.fuelGuideJa}
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
        {pending ? "保存中…" : "保存"}
      </button>
    </form>
  );
}
