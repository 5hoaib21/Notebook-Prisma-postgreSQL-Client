import Link from "next/link";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import NotesGrid from "@/components/NotesGrid";
import NoteFilters from "@/components/NoteFilters";
import LabelsManager from "@/components/LabelsManager";
import { notesApi, categoriesApi } from "@/lib/api";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface NotesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    pinned?: string;
    sort?: string;
    page?: string;
  }>;
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {
  await requireSession();
  const params = await searchParams;

  const [notesRes, categoriesRes] = await Promise.all([
    notesApi.list({
      search: params.search || undefined,
      category: params.category || undefined,
      pinned: params.pinned === "true" ? true : undefined,
      sort: params.sort || undefined,
      page: params.page ? Number(params.page) : 1,
    }),
    categoriesApi.list(),
  ]);

  const notes = notesRes.data.items;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">My notes</h1>
          <Link
            href="/notes/new"
            className="flex items-center gap-1.5 rounded-md bg-teal-700 px-3 py-2 text-sm text-white hover:bg-teal-800"
          >
            <Plus className="h-4 w-4" />
            New note
          </Link>
        </div>

        <div className="mb-6">
          <NoteFilters categories={categoriesRes.data} />
        </div>

        <div className="mb-6">
          <LabelsManager categories={categoriesRes.data} />
        </div>

        <NotesGrid notes={notes} />
      </main>
    </>
  );
};

export default NotesPage;