import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import NoteForm from "@/components/NoteForm";
import { notesApi, categoriesApi } from "@/lib/api";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

const EditNotePage = async ({ params }: EditNotePageProps) => {
  await requireSession();
  const { id } = await params;

  let note;
  try {
    const res = await notesApi.get(id);
    note = res.data;
  } catch {
    notFound();
  }

  const categoriesRes = await categoriesApi.list();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href={`/notes/${id}`}
          className="mb-4 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to note
        </Link>
        <h1 className="mb-6 text-2xl font-bold">Edit note</h1>
        <NoteForm categories={categoriesRes.data} note={note} />
      </main>
    </>
  );
};

export default EditNotePage;