"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categoriesApi } from "../api";
import { getSession } from "../auth";

export interface CategoryActionState {
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
  await ensureUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required" };
  try {
    await categoriesApi.create({ name });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to create category" };
  }
  revalidatePath("/notes");
  return {};
}

export async function deleteCategoryAction(id: string): Promise<void> {
  await ensureUser();
  try {
    await categoriesApi.remove(id);
  } finally {
    revalidatePath("/notes");
  }
}
