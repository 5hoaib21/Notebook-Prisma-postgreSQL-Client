"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminNotesApi, usersApi } from "../api";
import { getSession } from "../auth";

export interface AdminActionState {
  success?: string;
  error?: string;
}

const ensureAdmin = async (): Promise<void> => {
  const user = await getSession();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/");
};

const ACTION_MESSAGE = "You must be an admin to do that";

export async function deleteNoteAction(
  id: string,
  _prev: AdminActionState,
  _formData?: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
  } catch {
    return { error: ACTION_MESSAGE };
  }
  try {
    await adminNotesApi.remove(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete note" };
  }
  revalidatePath("/admin");
  return { success: "Note deleted" };
}

export async function updateUserRoleAction(
  id: string,
  role: "USER" | "ADMIN"
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
  } catch {
    return { error: ACTION_MESSAGE };
  }
  try {
    await usersApi.updateRole(id, role);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update role" };
  }
  revalidatePath("/admin");
  return { success: `Role changed to ${role}` };
}

export async function terminateUserAction(
  id: string,
  _prev?: AdminActionState,
  _formData?: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
  } catch {
    return { error: ACTION_MESSAGE };
  }
  try {
    await usersApi.terminate(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to terminate user" };
  }
  revalidatePath("/admin");
  return { success: "User terminated" };
}

export async function restoreUserAction(
  id: string,
  _prev?: AdminActionState,
  _formData?: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
  } catch {
    return { error: ACTION_MESSAGE };
  }
  try {
    await usersApi.restore(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to restore user" };
  }
  revalidatePath("/admin");
  return { success: "User restored" };
}