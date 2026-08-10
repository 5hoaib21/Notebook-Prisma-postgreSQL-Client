import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import NoteDetailActions from "@/components/NoteDetailActions";
import { notesApi } from "@/lib/api";
import { requireSession } from "@/lib/auth";

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

          <NoteDetailActions noteId={note.id} isPinned={note.isPinned} />
        </article>
      </main>
    </>
  );
};

export default NoteDetailPage;