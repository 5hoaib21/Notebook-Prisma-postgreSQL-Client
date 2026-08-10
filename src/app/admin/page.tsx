import Navbar from "@/components/Navbar";
import UsersTable from "@/components/UsersTable";
import NotesManager from "@/components/NotesManager";
import { adminNotesApi, usersApi } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  await requireAdmin();
  const params = await searchParams;

  const [usersRes, notesRes] = await Promise.all([
    usersApi.list({ limit: 100 }),
    adminNotesApi.list({
      search: params.search || undefined,
      limit: 100,
    }),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Admin</h1>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold">User Management</h2>
          <UsersTable users={usersRes.data.items} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Note Management</h2>
          <NotesManager
            notes={notesRes.data.items}
            search={params.search}
            total={notesRes.data.total}
          />
        </section>
      </main>
    </>
  );
};

export default AdminPage;