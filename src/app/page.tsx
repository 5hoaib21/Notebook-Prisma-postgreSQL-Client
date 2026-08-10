import Link from "next/link";
import { redirect } from "next/navigation";
import { NotebookPen, Pin, Clock, FolderOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const user = await getSession();
  if (user) redirect("/notes");

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
          <NotebookPen className="h-7 w-7" />
        </div>
        <h1 className="text-4xl font-bold">Notebook</h1>
        <p className="mx-auto mt-3 max-w-xl text-stone-500">
          A private, Google Keep–style notebook. Jot down ideas, pin the important
          ones, and organize everything with categories.
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-md bg-teal-700 px-5 py-2.5 text-white hover:bg-teal-800"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-stone-300 px-5 py-2.5 hover:bg-stone-100"
          >
            Login
          </Link>
        </div>

        <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <Pin className="mb-2 h-5 w-5 text-teal-700" />
            <h2 className="font-semibold">Pin top notes</h2>
            <p className="mt-1 text-sm text-stone-500">Keep your most important notes always visible first.</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <FolderOpen className="mb-2 h-5 w-5 text-teal-700" />
            <h2 className="font-semibold">Organize by category</h2>
            <p className="mt-1 text-sm text-stone-500">Group notes by category and filter them instantly.</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <Clock className="mb-2 h-5 w-5 text-teal-700" />
            <h2 className="font-semibold">Just you</h2>
            <p className="mt-1 text-sm text-stone-500">Private by default. Nobody else sees your notes.</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;