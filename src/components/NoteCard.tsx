import Link from "next/link";
import { Pin } from "lucide-react";
import type { Note } from "@/types";
import { togglePinAction } from "@/lib/actions/notes";
import NoteActions from "./NoteActions";

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <form
        action={togglePinAction.bind(null, note.id)}
        className="flex w-full items-start justify-between gap-2"
      >
        <button
          aria-label={note.isPinned ? "Unpin note" : "Pin note"}
          type="submit"
          className={`rounded-md p-1 transition ${
            note.isPinned
              ? "text-teal-700 hover:bg-teal-50"
              : "text-stone-300 hover:bg-stone-100 hover:text-stone-500"
          }`}
        >
          <Pin className={`h-4 w-4 ${note.isPinned ? "fill-teal-700" : ""}`} />
        </button>
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
          {note.category?.name ?? "Uncategorized"}
        </span>
      </form>

      <Link href={`/notes/${note.id}`} className="group flex flex-col gap-1">
        <h3 className="font-semibold text-stone-900 group-hover:text-teal-800 line-clamp-2">
          {note.title}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-4">{note.content}</p>
      </Link>

      <NoteActions note={note} />
    </div>
  );
};

export default NoteCard;