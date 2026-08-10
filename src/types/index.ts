export type UserRole = "USER" | "ADMIN";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isTerminated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
}

export interface AdminNote {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
  user: { id: string; name: string; email: string; role: UserRole };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count: { notes: number };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}