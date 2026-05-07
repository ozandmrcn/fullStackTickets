/**
 * @file page.tsx  (/ticket/[mode])
 * @description Dynamic page that handles both ticket creation and editing
 *              using a single route segment (`[mode]`).
 *
 *              Route behaviour:
 *              - `/ticket/add`         → Create mode  (empty form)
 *              - `/ticket/<ticketId>`  → Edit mode    (form pre-filled with existing data)
 *
 *              The `mode` segment doubles as the ticket ID when in edit mode,
 *              which lets us reuse a single dynamic route for both workflows.
 */

import Form from "@/components/form";
import { Ticket } from "@/types";
import { fetchTicketById } from "@/utils/db-logic";
import { FC } from "react";

/**
 * NEXT.JS DYNAMIC RENDERING CONFIGURATION
 * This page handles both adding new tickets and editing existing ones.
 * Since it relies on fresh database state and dynamic URL parameters, 
 * we force dynamic rendering to ensure the form always has the most 
 * up-to-date ticket data when in edit mode.
 */
export const dynamic = "force-dynamic";

/**
 * Page component props.
 * `params` is a Promise in Next.js 15+ because route params are resolved
 * asynchronously — they must be awaited before being accessed.
 */
interface Props {
  params: Promise<{
    /** Either the string "add" (create mode) or a MongoDB ObjectId (edit mode). */
    mode: string;
  }>;
}

/**
 * Ticket Create / Edit Page.
 *
 * Determines the current mode from the URL segment, optionally fetches the
 * existing ticket data when editing, then renders the shared `<Form>` component
 * with the appropriate props.
 *
 * @param {Props} props - Contains the async route params.
 */
const Page: FC<Props> = async ({ params }) => {
  // Await the params Promise before reading the dynamic segment.
  const { mode } = await params;

  // Any value other than "add" is treated as a ticket ID → edit mode.
  const isEditMode = mode !== "add" ? true : false;

  /** The ticket to pre-populate the form with, or null in create mode. */
  let editItem: Ticket | null = null;

  if (isEditMode) {
    // Fetch the existing ticket directly from the database.
    editItem = await fetchTicketById(mode);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Page title changes based on the current mode */}
      <h1 className="font-bold text-2xl text-zinc-500">
        {isEditMode ? "Update Ticket" : "Create Ticket"}
      </h1>

      {/* Shared form component — handles both create and edit via server actions */}
      <Form isEditMode={isEditMode} editItem={editItem} />
    </div>
  );
};

export default Page;
