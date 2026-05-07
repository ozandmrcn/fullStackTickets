/**
 * @file actions.ts
 * @description Next.js Server Actions for mutating Ticket data.
 *              These functions run exclusively on the server and are invoked
 *              directly from HTML <form> elements via the `action` prop.
 *
 *              After each mutation the relevant Next.js cache entries are
 *              invalidated with `revalidatePath` so subsequent page loads
 *              reflect the latest database state without a full browser refresh.
 */

"use server";

import Ticket from "@/app/api/models/ticket";
import connectMongo from "./connect-mongo";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Creates a new ticket document from data submitted via an HTML form.
 *
 * Steps:
 *  1. Extract form fields and shape them into a plain object.
 *  2. Connect to MongoDB.
 *  3. Persist the new ticket (schema validation runs inside `Ticket.create`).
 *  4. Invalidate all pages that display ticket data.
 *  5. Redirect the user to the tickets list.
 *
 * @param {FormData} formData - Serialized form data submitted by the user.
 */
export async function createTicketAction(formData: FormData) {
  // Extract each form field by its `name` attribute.
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  await connectMongo();

  // Persist the ticket; Mongoose validates the payload against the schema.
  const newTicket = await Ticket.create(rawData);

  // Purge the Next.js cache for every route that shows ticket data so users
  // see the newly created ticket immediately on the next navigation.
  revalidatePath("/tickets");
  revalidatePath("/");
  revalidatePath(`/ticket/${newTicket._id.toString()}`);

  redirect("/tickets");
}

/**
 * Updates an existing ticket document using data submitted via an HTML form.
 *
 * Steps:
 *  1. Read the ticket `id` from the hidden form field.
 *  2. Build the update payload from the remaining fields.
 *  3. Connect to MongoDB and apply the update.
 *  4. Invalidate affected cached routes.
 *  5. Redirect the user back to the tickets list.
 *
 * @param {FormData} formData - Serialized form data including a hidden `id` field.
 */
export async function updateTicketAction(formData: FormData) {
  // The ticket ID is passed as a read-only hidden input on the edit form.
  const id = formData.get("id");

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  await connectMongo();

  // Apply the update; the returned document is used to derive its ID for cache busting.
  const updatedTicket = await Ticket.findByIdAndUpdate(id, rawData, {});

  revalidatePath("/tickets");
  revalidatePath("/");
  revalidatePath(`/ticket/${updatedTicket._id.toString()}`);

  redirect("/tickets");
}
