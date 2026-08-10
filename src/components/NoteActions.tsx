import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Note } from "@/types";
import { deleteNoteAction } from "@/lib/actions/notes";

const NoteActions = ({ note }: { note: Note }) => {
  return (
    <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-2 text-xs text-stone-400">
      <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
      <div className="flex items-center gap-1">
        <Link
          href={`/notes/${note.id}/edit`}
          aria-label="Edit note"
          className="rounded-md p-1.5 hover:bg-stone-100 hover:text-stone-700"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <form action={deleteNoteAction.bind(null, note.id)}>
          <button
            aria-label="Delete note"
            type="submit"
            className="rounded-md p-1.5 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteActions;