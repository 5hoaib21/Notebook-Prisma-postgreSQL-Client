"use client";

import { useEffect, useActionState, useState } from "react";
import toast from "react-hot-toast";
import type { UserProfile } from "@/types";
import {
  restoreUserAction,
  terminateUserAction,
  updateUserRoleAction,
  type AdminActionState,
} from "@/lib/actions/admin";

const TerminateButton = ({ id }: { id: string }) => {
  const [state, formAction, pending] = useActionState<AdminActionState, FormData>(
    terminateUserAction.bind(null, id),
    {}
  );

  useEffect(() => {
    if (state.success) toast.success(state.success);
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-60"
      >
        Ban
      </button>
    </form>
  );
};

const RestoreButton = ({ id }: { id: string }) => {
  const [state, formAction, pending] = useActionState<AdminActionState, FormData>(
    restoreUserAction.bind(null, id),
    {}
  );

  useEffect(() => {
    if (state.success) toast.success(state.success);
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-stone-300 px-2 py-1 text-xs hover:bg-stone-100 disabled:opacity-60"
      >
        Restore
      </button>
    </form>
  );
};

const RoleSelect = ({ userId, role }: { userId: string; role: "USER" | "ADMIN" }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (value: string) => {
    setLoading(true);
    const result = await updateUserRoleAction(userId, value as "USER" | "ADMIN");
    setLoading(false);
    if (result.error) toast.error(result.error);
    else if (result.success) toast.success(result.success);
  };

  return (
    <select
      defaultValue={role}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-md border border-stone-300 px-2 py-1 bg-white disabled:opacity-60"
    >
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
};

const UsersTable = ({ users }: { users: UserProfile[] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-stone-200 bg-stone-50 text-stone-500">
          <tr>
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Email</th>
            <th className="px-4 py-2 font-medium">Role</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 font-medium">{user.name}</td>
              <td className="px-4 py-2 text-stone-500">{user.email}</td>
              <td className="px-4 py-2">
                <RoleSelect userId={user.id} role={user.role} />
              </td>
              <td className="px-4 py-2">
                {user.isTerminated ? (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                    Terminated
                  </span>
                ) : (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    Active
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-right">
                {user.isTerminated ? (
                  <RestoreButton id={user.id} />
                ) : (
                  <TerminateButton id={user.id} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;