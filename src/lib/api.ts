import "server-only";
import { getToken, baseURL } from "./auth";
import type {
  AdminNote,
  ApiEnvelope,
  Category,
  Note,
  PaginatedResult,
  UserProfile,
} from "@/types";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown
): Promise<ApiEnvelope<T>> {
  const token = await getToken();
  const res = await fetch(`${baseURL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const result = (await res.json()) as ApiEnvelope<T>;
  if (!res.ok) {
    throw new Error(result.message || `Request failed: ${res.status}`);
  }
  return result;
}

export const notesApi = {
  list(params: {
    search?: string;
    category?: string;
    pinned?: boolean;
    sort?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const q = new URLSearchParams();
    if (params.search) q.set("search", params.search);
    if (params.category) q.set("category", params.category);
    if (params.pinned !== undefined) q.set("pinned", String(params.pinned));
    if (params.sort) q.set("sort", params.sort);
    if (params.page) q.set("page", String(params.page));
    if (params.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return request<PaginatedResult<Note>>("GET", `/api/notes${qs ? `?${qs}` : ""}`);
  },

  get(id: string) {
    return request<Note>("GET", `/api/notes/${id}`);
  },

  create(data: { title: string; content: string; isPinned?: boolean; categoryId?: string | null }) {
    return request<Note>("POST", "/api/notes", data);
  },

  update(
    id: string,
    data: { title?: string; content?: string; isPinned?: boolean; categoryId?: string | null }
  ) {
    return request<Note>("PATCH", `/api/notes/${id}`, data);
  },

  togglePin(id: string) {
    return request<Note>("PATCH", `/api/notes/${id}/pin`);
  },

  remove(id: string) {
    return request<Note>("DELETE", `/api/notes/${id}`);
  },
};

export const categoriesApi = {
  list() {
    return request<Category[]>("GET", "/api/categories");
  },
  get(id: string) {
    return request<Category>("GET", `/api/categories/${id}`);
  },
  create(data: { name: string; slug?: string }) {
    return request<Category>("POST", "/api/categories", data);
  },
  update(id: string, data: { name?: string; slug?: string }) {
    return request<Category>("PATCH", `/api/categories/${id}`, data);
  },
  remove(id: string) {
    return request<Category>("DELETE", `/api/categories/${id}`);
  },
};

export const usersApi = {
  list(params: { page?: number; limit?: number } = {}) {
    const q = new URLSearchParams();
    if (params.page) q.set("page", String(params.page));
    if (params.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return request<PaginatedResult<UserProfile>>("GET", `/api/users${qs ? `?${qs}` : ""}`);
  },
  updateRole(id: string, role: "USER" | "ADMIN") {
    return request<UserProfile>("PATCH", `/api/users/role/${id}`, { role });
  },
  terminate(id: string) {
    return request<UserProfile>("DELETE", `/api/users/${id}/terminate`);
  },
  restore(id: string) {
    return request<UserProfile>("PATCH", `/api/users/${id}/restore`);
  },
};

export const adminNotesApi = {
  list(params: { search?: string; page?: number; limit?: number } = {}) {
    const q = new URLSearchParams();
    if (params.search) q.set("search", params.search);
    if (params.page) q.set("page", String(params.page));
    if (params.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return request<PaginatedResult<AdminNote>>("GET", `/api/admin/notes${qs ? `?${qs}` : ""}`);
  },
  get(id: string) {
    return request<AdminNote>("GET", `/api/admin/notes/${id}`);
  },
  remove(id: string) {
    return request<AdminNote>("DELETE", `/api/admin/notes/${id}`);
  },
};