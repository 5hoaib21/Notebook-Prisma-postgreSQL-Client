"use client";

import type { UserProfile } from "@/types";
import {
  restoreUserAction,
  terminateUserAction,
  updateUserRoleAction,
} from "@/lib/actions/admin";

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
                <select
                  defaultValue={user.role}
                  onChange={(e) =>
                    updateUserRoleAction(user.id, e.target.value as "USER" | "ADMIN")
                  }
                  className="rounded-md border border-stone-300 px-2 py-1 bg-white"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
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
                  <form action={restoreUserAction.bind(null, user.id)}>
                    <button
                      type="submit"
                      className="rounded-md border border-stone-300 px-2 py-1 text-xs hover:bg-stone-100"
                    >
                      Restore
                    </button>
                  </form>
                ) : (
                  <form action={terminateUserAction.bind(null, user.id)}>
                    <button
                      type="submit"
                      className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                      Ban
                    </button>
                  </form>
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