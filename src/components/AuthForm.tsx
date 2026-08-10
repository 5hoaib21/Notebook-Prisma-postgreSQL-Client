"use client";

import { useActionState } from "react";
import { loginAction, signupAction, type AuthActionState } from "@/lib/actions/auth";

export const googleAuthUrl =
  (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:8080";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    mode === "login" ? loginAction : signupAction,
    {}
  );

  return (
    <div className="flex flex-col gap-4">
      <a
        href={`${googleAuthUrl}/api/auth/google`}
        className="flex items-center justify-center gap-2 rounded-md border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.29A7.17 7.17 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
          />
        </svg>
        Continue with Google
      </a>

      <div className="flex items-center gap-3 text-xs text-stone-400">
        <span className="h-px flex-1 bg-stone-200" />
        or
        <span className="h-px flex-1 bg-stone-200" />
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={100}
              autoComplete="name"
              className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-teal-600"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-teal-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-teal-600"
          />
        </div>

        {state.error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-teal-700 px-4 py-2 text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {pending ? "Please wait…" : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;