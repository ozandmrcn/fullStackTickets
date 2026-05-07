/**
 * @file delete-button.tsx
 * @description Client-side button component that deletes a ticket after the user
 *              confirms the action via a native browser `confirm` dialog.
 *              Marked "use client" because it uses the Next.js router hook.
 */

"use client";

import { deleteTicket } from "@/utils/service";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

/** Component props — expects the MongoDB ObjectId of the ticket to delete. */
interface Props {
  id: string;
}

/**
 * DeleteButton
 *
 * Renders a small trash icon button. On click it:
 * 1. Shows a native confirmation dialog to prevent accidental deletions.
 * 2. Calls the `deleteTicket` service function (HTTP DELETE).
 * 3. Calls `router.refresh()` to trigger a server-side re-fetch so the
 *    deleted ticket disappears from the list without a full page reload.
 *
 * @param {Props} props - Contains the ticket `id` to be deleted.
 */
const DeleteButton: FC<Props> = ({ id }) => {
  const router = useRouter();

  /**
   * Handles the delete flow:
   * - Aborts early if the user cancels the confirmation dialog.
   * - Otherwise deletes the ticket and refreshes the current route.
   */
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete?")) return;

    deleteTicket(id).then(() => router.refresh());
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition"
    >
      <Trash className="size-4" />
    </button>
  );
};

export default DeleteButton;
