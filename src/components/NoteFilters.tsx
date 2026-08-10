"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type SortOption = "newest" | "oldest" | "title";

const SORTS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title" },
];

export interface NoteFiltersProps {
  categories: { slug: string; name: string }[];
}

const NoteFilters = ({ categories }: NoteFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = (searchParams.get("sort") as SortOption) ?? "newest";
  const pinned = searchParams.get("pinned");

  const buildHref = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    return qs ? `/notes?${qs}` : "/notes";
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <input
        type="text"
        placeholder="Search notes…"
        defaultValue={searchParams.get("search") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = (e.target as HTMLInputElement).value.trim();
            router.push(buildHref({ search: value || null }));
          }
        }}
        className="rounded-md border border-stone-300 px-3 py-1.5 outline-none focus:border-teal-600"
      />

      <select
        value={activeCategory}
        onChange={(e) => router.push(buildHref({ category: e.target.value || null }))}
        className="rounded-md border border-stone-300 px-2 py-1.5 bg-white outline-none focus:border-teal-600"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={activeSort}
        onChange={(e) => router.push(buildHref({ sort: e.target.value || null }))}
        className="rounded-md border border-stone-300 px-2 py-1.5 bg-white outline-none focus:border-teal-600"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <button
        onClick={() => router.push(buildHref({ pinned: pinned === "true" ? null : "true" }))}
        className={`rounded-md border px-3 py-1.5 ${
          pinned === "true"
            ? "border-teal-600 bg-teal-50 text-teal-800"
            : "border-stone-300 hover:bg-stone-100"
        }`}
      >
        {pinned === "true" ? "Pinned only" : "All notes"}
      </button>
    </div>
  );
};

export default NoteFilters;