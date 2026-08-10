import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { requireGuest } from "@/lib/auth";

export const dynamic = "force-dynamic";

const LoginPage = async () => {
  await requireGuest();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-center text-2xl font-bold">Login</h1>
        <p className="mb-6 text-center text-sm text-stone-500">
          Welcome back to Notebook
        </p>
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-stone-500">
          No account?{" "}
          <Link href="/signup" className="text-teal-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;