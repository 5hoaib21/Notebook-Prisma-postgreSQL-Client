"use client";

import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Category, Note } from "@/types";
import { createNoteAction, updateNoteAction, type NoteActionState } from "@/lib/actions/notes";

const NoteForm = ({ categories, note }: { categories: Category[]; note?: Note }) => {
  const router = useRouter();
  const action = note ? updateNoteAction : createNoteAction;
  const [state, formAction, pending] = useActionState<NoteActionState, FormData>(action, {});

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.push("/notes");
      router.refresh();
    }
    if (state.error) toast.error(state.error);
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
    >
      {note && <input type="hidden" name="id" value={note.id} />}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={note?.title ?? ""}
          maxLength={200}
          className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-teal-600"
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          defaultValue={note?.content ?? ""}
          rows={8}
          className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-teal-600"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="categoryId" className="text-sm font-medium">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={note?.categoryId ?? ""}
          className="rounded-md border border-stone-300 px-3 py-2 bg-white outline-none focus:border-teal-600"
        >
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isPinned"
            defaultChecked={note?.isPinned ?? false}
            className="h-4 w-4 accent-teal-700"
          />
          Pin to top
        </label>
      </div>

      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-md bg-teal-700 px-4 py-2 text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : note ? "Save changes" : "Create note"}
      </button>
    </form>
  );
};

export default NoteForm;