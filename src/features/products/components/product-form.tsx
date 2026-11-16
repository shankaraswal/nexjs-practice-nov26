"use client";

import { useActionState } from "react";
import { addProduct } from "../actions";
import { initialProductActionState } from "../action-state";

export default function ProductForm() {
  const [state, formAction, isPending] = useActionState(
    addProduct,
    initialProductActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="product-name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Product name
        </label>
        <input
          id="product-name"
          name="name"
          type="text"
          minLength={2}
          maxLength={120}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label
          htmlFor="product-description"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Description
        </label>
        <textarea
          id="product-description"
          name="description"
          rows={3}
          maxLength={1000}
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label
          htmlFor="product-price"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Price
        </label>
        <input
          id="product-price"
          name="price"
          type="number"
          min="0.01"
          max="99999999.99"
          step="0.01"
          inputMode="decimal"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <p className="mt-1 text-xs text-slate-500">
          Enter an amount with up to two decimal places.
        </p>
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className={`text-sm ${
            state.status === "success" ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Adding product..." : "Add product"}
      </button>
    </form>
  );
}
