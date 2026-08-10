import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { requireGuest } from "@/lib/auth";

export const dynamic = "force-dynamic";

const SignupPage = async () => {
  await requireGuest();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-center text-2xl font-bold">Create your account</h1>
        <p className="mb-6 text-center text-sm text-stone-500">
          Start keeping notes in Notebook
        </p>
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-stone-500">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;