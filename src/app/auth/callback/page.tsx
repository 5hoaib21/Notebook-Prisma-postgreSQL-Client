import Link from "next/link";
import { redirect } from "next/navigation";
import { establishSession } from "@/lib/auth";

interface CallbackPageProps {
  searchParams: Promise<{ token?: string; error?: string }>;
}

const callbackPage = async ({ searchParams }: CallbackPageProps) => {
  const params = await searchParams;

  if (params.error) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-xl font-bold">Google sign-in failed</h1>
        <p className="mb-6 text-sm text-stone-500">{params.error}</p>
        <Link
          href="/login"
          className="rounded-md bg-teal-700 px-4 py-2 text-sm text-white hover:bg-teal-800"
        >
          Back to login
        </Link>
      </main>
    );
  }

  if (!params.token) {
    redirect("/login");
  }

  const payload = await establishSession(params.token);
  if (!payload) {
    redirect("/login");
  }

  redirect("/notes");
};

export default callbackPage;