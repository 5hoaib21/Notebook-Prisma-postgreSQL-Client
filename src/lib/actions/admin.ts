"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminNotesApi, usersApi } from "../api";
import { getSession } from "../auth";

export interface AdminActionState {
  error?: string;
}

const ensureAdmin = async (): Promise<void> => {
  const user = await getSession();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/");
};

export async function deleteNoteAction(id: string): Promise<void> {
  await ensureAdmin();
  try {
    await adminNotesApi.remove(id);
  } finally {
    revalidatePath("/admin");
  }
}

export async function updateUserRoleAction(id: string, role: "USER" | "ADMIN"): Promise<void> {
  await ensureAdmin();
  try {
    await usersApi.updateRole(id, role);
  } finally {
    revalidatePath("/admin");
  }
}

export async function terminateUserAction(id: string): Promise<void> {
  await ensureAdmin();
  try {
    await usersApi.terminate(id);
  } finally {
    revalidatePath("/admin");
  }
}

export async function restoreUserAction(id: string): Promise<void> {
  await ensureAdmin();
  try {
    await usersApi.restore(id);
  } finally {
    revalidatePath("/admin");
  }
}