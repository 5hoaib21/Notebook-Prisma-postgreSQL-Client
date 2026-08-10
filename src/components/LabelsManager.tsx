"use client";

import { useEffect, useActionState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Category } from "@/types";
import {
  createCategoryAction,
  deleteCategoryAction,
  type CategoryActionState,
} from "@/lib/actions/categories";

const DeleteLabelButton = ({ id }: { id: string }) => {
  const [state, formAction, pending] = useActionState<CategoryActionState, FormData>(
    deleteCategoryAction.bind(null, id),
    {}
  );

  useEffect(() => {
    if (state.success) toast.success(state.success);
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={pending}
        aria-label="Delete label"
        className="rounded-md p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
};

const LabelsManager = ({ categories }: { categories: Category[] }) => {
  const [state, formAction, pending] = useActionState<CategoryActionState, FormData>(
    createCategoryAction,
    {}
  );

  useEffect(() => {
    if (state.success) toast.success(state.success);
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-stone-700">Labels</h2>
        <p className="text-xs text-stone-400">Create your own labels for notes.</p>
      </div>

      <ul className="max-h-56 divide-y divide-stone-100 overflow-y-auto">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between px-4 py-2 text-sm">
            <span>
              {c.name}
              <span className="ml-2 text-stone-400">{c._count.notes} notes</span>
            </span>
            <DeleteLabelButton id={c.id} />
          </li>
        ))}
      </ul>

      <form action={formAction} className="flex items-center gap-2 border-t border-stone-100 p-4">
        <input
          name="name"
          required
          placeholder="New label name"
          className="flex-1 rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-teal-700 px-3 py-2 text-sm text-white hover:bg-teal-800 disabled:opacity-60"
        >
          Add
        </button>
      </form>
      {state.error && <p className="px-4 pb-4 text-sm text-red-600">{state.error}</p>}
    </div>
  );
};

export default LabelsManager;