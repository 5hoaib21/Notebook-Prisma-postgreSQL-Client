import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import { NotebookPen } from "lucide-react";

const Navbar = async () => {
  const user = await getSession();

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href={user ? "/notes" : "/"} className="flex items-center gap-2 font-semibold">
          <NotebookPen className="h-5 w-5 text-teal-700" />
          <span>Notebook</span>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-stone-500 sm:inline">
                {user.name} · {user.role}
              </span>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-teal-700 hover:underline">
                  Admin
                </Link>
              )}
              <form action={logoutAction}>
                <button className="rounded-md border border-stone-300 px-3 py-1.5 hover:bg-stone-100">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-stone-300 px-3 py-1.5 hover:bg-stone-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-teal-700 px-3 py-1.5 text-white hover:bg-teal-800"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;