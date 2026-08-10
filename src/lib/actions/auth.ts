"use server";

import { redirect } from "next/navigation";
import { baseURL, establishSession } from "../auth";

export interface AuthActionState {
  success?: string;
  error?: string;
}

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const res = await fetch(`${baseURL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const body = (await res.json()) as { success: boolean; message: string; data?: { token: string } };

  if (!res.ok || !body.data) {
    return { error: body.message || "Login failed" };
  }

  await establishSession(body.data.token);
  return { success: "Logged in successfully" };
}

export async function signupAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const res = await fetch(`${baseURL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    cache: "no-store",
  });
  const body = (await res.json()) as { success: boolean; message: string; data?: { token: string } };

  if (!res.ok || !body.data) {
    return { error: body.message || "Signup failed" };
  }

  await establishSession(body.data.token);
  return { success: "Account created. Welcome!" };
}

export async function logoutAction(): Promise<void> {
  const { clearToken } = await import("../auth");
  await clearToken();
  redirect("/login");
}