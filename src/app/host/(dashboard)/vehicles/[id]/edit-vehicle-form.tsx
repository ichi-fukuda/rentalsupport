"use client";

import { useActionState } from "react";
import { updateVehicleAction, type FormState } from "../actions";
import type { Vehicle } from "@/generated/prisma/client";

const initialState: FormState = {};

export function EditVehicleForm({ vehicle }: { vehicle: Vehicle }) {
  const [state, action, pending] = useActionState(updateVehicleAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 card">
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
            className="field-input"
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
            className="field-input"
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
            className="field-input"
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
            className="field-input"
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
          className="field-input"
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
          className="field-input"
        />
      </div>

      {state.error && (
        <p className="error-box">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary self-start"
      >
        {pending ? "保存中…" : "保存"}
      </button>
    </form>
  );
}
