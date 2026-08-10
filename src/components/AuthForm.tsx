"use client";

import { useActionState } from "react";
import { loginAction, signupAction, type AuthActionState } from "@/lib/actions/auth";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    mode === "login" ? loginAction : signupAction,
    {}
  );

  return (
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
  );
};

export default AuthForm;