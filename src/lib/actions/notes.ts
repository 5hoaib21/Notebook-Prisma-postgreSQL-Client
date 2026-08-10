"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notesApi } from "../api";
import { getToken } from "../auth";

export interface NoteActionState {
  success?: string;
  error?: string;
}

const TOKEN_MESSAGE = "You must be logged in to do that";

export async function createNoteAction(
  _prev: NoteActionState,
  formData: FormData
): Promise<NoteActionState> {
  const token = await getToken();
  if (!token) return { error: TOKEN_MESSAGE };

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
  return { success: "Note created" };
}

export async function updateNoteAction(
  _prev: NoteActionState,
  formData: FormData
): Promise<NoteActionState> {
  const token = await getToken();
  if (!token) return { error: TOKEN_MESSAGE };

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
  return { success: "Note updated" };
}

export async function deleteNoteAction(
  id: string,
  _prev: NoteActionState,
  _formData?: FormData
): Promise<NoteActionState> {
  const token = await getToken();
  if (!token) return { error: TOKEN_MESSAGE };
  try {
    await notesApi.remove(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete note" };
  }
  revalidatePath("/notes");
  return { success: "Note deleted" };
}

export async function togglePinAction(
  id: string,
  _prev: NoteActionState,
  _formData?: FormData
): Promise<NoteActionState> {
  const token = await getToken();
  if (!token) return { error: TOKEN_MESSAGE };
  try {
    await notesApi.togglePin(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update pin status" };
  }
  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  return { success: "Pinned status updated" };
}