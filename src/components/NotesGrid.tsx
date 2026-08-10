import type { Note } from "@/types";
import NoteCard from "./NoteCard";

const NotesGrid = ({ notes }: { notes: Note[] }) => {
  if (notes.length === 0) {
    return (
      <div className="col-span-full rounded-xl border border-dashed border-stone-300 bg-white py-16 text-center text-stone-500">
        No notes here yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesGrid;