import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { notesApi } from "@/lib/api";
import { requireSession } from "@/lib/auth";
import { deleteNoteAction, togglePinAction } from "@/lib/actions/notes";

export const dynamic = "force-dynamic";

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  await requireSession();
  const { id } = await params;

  let note;
  try {
    const res = await notesApi.get(id);
    note = res.data;
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/notes"
          className="mb-4 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to notes
        </Link>

        <article className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <span className="mt-1 shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
              {note.category?.name ?? "Uncategorized"}
            </span>
          </div>

          <p className="whitespace-pre-wrap text-stone-700">{note.content}</p>

          <p className="mt-6 text-xs text-stone-400">
            Created {new Date(note.createdAt).toLocaleString()} · Updated{" "}
            {new Date(note.updatedAt).toLocaleString()}
          </p>

          <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-4">
            <Link
              href={`/notes/${note.id}/edit`}
              className="flex items-center gap-1.5 rounded-md border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-100"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
            <form action={togglePinAction.bind(null, note.id)}>
              <button
                type="submit"
                className="rounded-md border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-100"
              >
                {note.isPinned ? "Unpin" : "Pin"}
              </button>
            </form>
            <form action={deleteNoteAction.bind(null, note.id)}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </form>
          </div>
        </article>
      </main>
    </>
  );
};

export default NoteDetailPage;