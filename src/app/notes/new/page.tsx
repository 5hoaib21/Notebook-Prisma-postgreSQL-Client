import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import NoteForm from "@/components/NoteForm";
import { categoriesApi } from "@/lib/api";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const NewNotePage = async () => {
  await requireSession();
  const categoriesRes = await categoriesApi.list();

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
        <h1 className="mb-6 text-2xl font-bold">New note</h1>
        <NoteForm categories={categoriesRes.data} />
      </main>
    </>
  );
};

export default NewNotePage;