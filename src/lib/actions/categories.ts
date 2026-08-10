"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categoriesApi } from "../api";
import { getSession } from "../auth";

export interface CategoryActionState {
  success?: string;
  error?: string;
}

const ensureUser = async (): Promise<void> => {
  const user = await getSession();
  if (!user) redirect("/login");
};

export async function createCategoryAction(
  _prev: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  try {
    await ensureUser();
  } catch {
    return { error: "You must be logged in to do that" };
  }
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required" };
  try {
    await categoriesApi.create({ name });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to create category" };
  }
  revalidatePath("/notes");
  return { success: `Label "${name}" created` };
}

export async function deleteCategoryAction(
  id: string,
  _prev: CategoryActionState,
  _formData?: FormData
): Promise<CategoryActionState> {
  try {
    await ensureUser();
  } catch {
    return { error: "You must be logged in to do that" };
  }
  try {
    await categoriesApi.remove(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete category" };
  }
  revalidatePath("/notes");
  return { success: "Label deleted" };
}
