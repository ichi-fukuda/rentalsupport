"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type FormState } from "../actions";

const initialState: FormState = {};

export default function HostLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold">店舗ログイン</h1>

      <form action={action} className="flex flex-col gap-4">
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
          <label htmlFor="password" className="text-sm font-medium">
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
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
          {pending ? "ログイン中…" : "ログイン"}
        </button>
      </form>

      <p className="text-sm text-muted">
        アカウントをお持ちでない方は{" "}
        <Link href="/host/signup" className="underline">
          新規申込み
        </Link>
      </p>
    </div>
  );
}
