"use client";

import { useActionState } from "react";
import { createCustomerAction, type FormState } from "./actions";
import { NATIONALITIES } from "@/lib/nationality";

const initialState: FormState = {};

export function AddCustomerForm() {
  const [state, action, pending] = useActionState(createCustomerAction, initialState);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 card"
    >
      <h2 className="font-semibold">利用客を登録</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            氏名
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="例：John Smith"
            className="field-input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field-input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nationality" className="text-sm font-medium">
            国籍
          </label>
          <select
            id="nationality"
            name="nationality"
            className="field-input"
          >
            {NATIONALITIES.map((n) => (
              <option key={n.code} value={n.code}>
                {n.flag} {n.labelJa}
              </option>
            ))}
          </select>
        </div>
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
        {pending ? "登録中…" : "利用客を登録"}
      </button>
    </form>
  );
}
