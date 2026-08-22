"use client";

import { useActionState } from "react";
import { customerLoginAction, type FormState } from "./actions";

const initialState: FormState = {};

export function LoginForm({ storeToken }: { storeToken: string }) {
  const [state, action, pending] = useActionState(customerLoginAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="storeToken" value={storeToken} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email address / メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
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
        {pending ? "..." : "Log in / ログイン"}
      </button>
    </form>
  );
}
