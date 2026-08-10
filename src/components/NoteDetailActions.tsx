"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { deleteNoteAction, togglePinAction } from "@/lib/actions/notes";

const NoteDetailActions = ({
  noteId,
  isPinned,
}: {
  noteId: string;
  isPinned: boolean;
}) => {
  const router = useRouter();
  const [pinState, pinFormAction, pinPending] = useActionState(
    togglePinAction.bind(null, noteId),
    {}
  );
  const [deleteState, deleteFormAction, deletePending] = useActionState(
    deleteNoteAction.bind(null, noteId),
    {}
  );

  useEffect(() => {
    if (pinState.success) {
      toast.success(pinState.success);
      router.refresh();
    }
    if (pinState.error) toast.error(pinState.error);
  }, [pinState, router]);

  useEffect(() => {
    if (deleteState.success) {
      toast.success(deleteState.success);
      router.push("/notes");
      router.refresh();
    }
    if (deleteState.error) toast.error(deleteState.error);
  }, [deleteState, router]);

  return (
    <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-4">
      <Link
        href={`/notes/${noteId}/edit`}
        className="flex items-center gap-1.5 rounded-md border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-100"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </Link>
      <form action={pinFormAction}>
        <button
          type="submit"
          disabled={pinPending}
          className="rounded-md border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-100 disabled:opacity-60"
        >
          {isPinned ? "Unpin" : "Pin"}
        </button>
      </form>
      <form action={deleteFormAction}>
        <button
          type="submit"
          disabled={deletePending}
          className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </form>
    </div>
  );
};

export default NoteDetailActions;