import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserProfile, ApiEnvelope } from "@/types";

const COOKIE_NAME = "nb_token";

export interface AuthPayload {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface LoginResponse {
  user: UserProfile;
  token: string;
}

export const baseURL = (process.env.NEXT_PUBLIC_BASE_URL as string) ?? "http://localhost:8080";

export const getToken = async (): Promise<string | null> => {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
};

export const setToken = async (token: string): Promise<void> => {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearToken = async (): Promise<void> => {
  const store = await cookies();
  store.delete(COOKIE_NAME);
};

export const getSession = async (): Promise<UserProfile | null> => {
  const token = await getToken();
  if (!token) return null;
  const res = await fetch(`${baseURL}/api/auth/me`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const body = (await res.json()) as ApiEnvelope<UserProfile>;
  return body.success ? body.data : null;
};

export const requireSession = async (): Promise<UserProfile> => {
  const user = await getSession();
  if (!user) redirect("/login");
  return user;
};

export const requireAdmin = async (): Promise<UserProfile> => {
  const user = await requireSession();
  if (user.role !== "ADMIN") redirect("/");
  return user;
};

export const requireGuest = async (): Promise<void> => {
  const user = await getSession();
  if (user) redirect("/");
};

export const decodeToken = (token: string): AuthPayload | null => {
  try {
    const payload = token.split(".")[1];
    const json = Buffer.from(payload, "base64url").toString("utf-8");
    return JSON.parse(json) as AuthPayload;
  } catch {
    return null;
  }
};

/** Set the session cookie from a raw JWT returned by the backend (server action only). */
export const establishSession = async (token: string): Promise<AuthPayload | null> => {
  const payload = decodeToken(token);
  if (!payload) return null;
  await setToken(token);
  return payload;
};