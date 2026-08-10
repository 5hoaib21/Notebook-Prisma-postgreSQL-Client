import Link from "next/link";
import { Pin, Trash2 } from "lucide-react";
import type { AdminNote } from "@/types";
import { deleteNoteAction } from "@/lib/actions/admin";

const NotesManager = ({
  notes,
  search,
  total,
}: {
  notes: AdminNote[];
  search?: string;
  total: number;
}) => {
  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 px-4 py-3">
        <p className="text-sm text-stone-500">{total} note(s) in the system</p>
        <form action="/admin" method="get" className="flex items-center gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search ?? ""}
            placeholder="Search title / author…"
            className="rounded-md border border-stone-300 px-3 py-1.5 text-sm outline-none focus:border-teal-600"
          />
          <button
            type="submit"
            className="rounded-md bg-stone-100 px-3 py-1.5 text-sm hover:bg-stone-200"
          >
            Search
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Author</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 text-center font-medium">Pinned</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {notes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">
                  No notes found.
                </td>
              </tr>
            )}
            {notes.map((note) => (
              <tr key={note.id}>
                <td className="max-w-[16rem] truncate px-4 py-2 font-medium">{note.title}</td>
                <td className="px-4 py-2 text-stone-500">
                  {note.user.name} <span className="text-stone-400">&lt;{note.user.email}&gt;</span>
                </td>
                <td className="px-4 py-2 text-stone-500">{note.category?.name ?? "—"}</td>
                <td className="px-4 py-2 text-center">
                  {note.isPinned ? (
                    <Pin className="inline h-4 w-4 text-teal-700" aria-label="Pinned" />
                  ) : (
                    <span className="text-stone-300">—</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/notes/${note.id}`}
                      className="rounded-md border border-stone-300 px-2 py-1 text-xs hover:bg-stone-100"
                    >
                      View
                    </Link>
                    <form action={deleteNoteAction.bind(null, note.id)}>
                      <button
                        type="submit"
                        aria-label={`Delete ${note.title}`}
                        className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesManager;