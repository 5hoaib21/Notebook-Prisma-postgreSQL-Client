"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notesApi } from "../api";
import { getToken } from "../auth";

export interface NoteActionState {
  error?: string;
}

export async function createNoteAction(
  _prev: NoteActionState,
  formData: FormData
): Promise<NoteActionState> {
  const token = await getToken();
  if (!token) redirect("/login");

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "") || null;
  const isPinned = formData.get("isPinned") === "on";

  if (!title || !content) return { error: "Title and content are required" };

  try {
    await notesApi.create({ title, content, isPinned, categoryId });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to create note" };
  }

  revalidatePath("/notes");
  redirect("/notes");
}

export async function updateNoteAction(
  _prev: NoteActionState,
  formData: FormData
): Promise<NoteActionState> {
  const token = await getToken();
  if (!token) redirect("/login");

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "") || null;
  const isPinned = formData.get("isPinned") === "on";

  if (!title || !content) return { error: "Title and content are required" };

  try {
    await notesApi.update(id, { title, content, isPinned, categoryId });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update note" };
  }

  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  redirect("/notes");
}

export async function deleteNoteAction(id: string): Promise<void> {
  const token = await getToken();
  if (!token) redirect("/login");
  try {
    await notesApi.remove(id);
  } finally {
    revalidatePath("/notes");
  }
}

export async function togglePinAction(id: string): Promise<void> {
  const token = await getToken();
  if (!token) redirect("/login");
  try {
    await notesApi.togglePin(id);
  } finally {
    revalidatePath("/notes");
  }
}