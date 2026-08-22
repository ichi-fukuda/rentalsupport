"use client";

import { useActionState } from "react";
import { updateManualAction, type FormState } from "./actions";

const initialState: FormState = {};

export function ManualForm({ initialText }: { initialText: string }) {
  const [state, action, pending] = useActionState(updateManualAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-3">
      <textarea
        name="manualText"
        rows={16}
        defaultValue={initialText}
        placeholder="例：ご利用前に燃料の種類とレベルをご確認ください。返却時は満タン返却でお願いします。..."
        className="field-input"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary self-start"
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
