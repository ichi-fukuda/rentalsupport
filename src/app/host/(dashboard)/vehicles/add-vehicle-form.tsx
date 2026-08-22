"use client";

import { useActionState } from "react";
import { createVehicleAction, type FormState } from "./actions";

const initialState: FormState = {};

export function AddVehicleForm() {
  const [state, action, pending] = useActionState(createVehicleAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 card">
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
            placeholder="例：ハイブリッドセダン"
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
            defaultValue={new Date().getFullYear()}
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
          運転席まわりの操作（日本語、箇条書き推奨）
        </label>
        <textarea
          id="controlsJa"
          name="controlsJa"
          rows={4}
          placeholder="例：パワースイッチはブレーキを踏みながら押す、シフトレバーは..."
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
          placeholder="例：レギュラーガソリン使用、給油口は運転席側後方..."
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
        {pending ? "追加中…" : "車両を追加"}
      </button>
    </form>
  );
}
