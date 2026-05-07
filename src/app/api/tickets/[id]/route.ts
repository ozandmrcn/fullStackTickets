/**
 * @file route.ts  (GET | DELETE | PUT /api/tickets/[id])
 * @description API route handler for a single Ticket resource identified by its MongoDB ObjectId.
 *              - GET    → fetch one ticket by ID.
 *              - DELETE → permanently remove a ticket by ID.
 *              - PUT    → update an existing ticket by ID.
 */

import connectMongo from "@/utils/connect-mongo";
import { NextResponse as Res } from "next/server";
import Ticket from "../../models/ticket";

/**
 * Route segment params type.
 * `id` corresponds to the dynamic [id] segment in the file-system router.
 */
type Params = {
  id: string;
};

/**
 * GET /api/tickets/[id]
 *
 * Finds and returns a single ticket document by its MongoDB ObjectId.
 *
 * @param {Request} req      - Incoming Next.js request (unused but required by the signature).
 * @param {{ params: Params }} context - Route params containing the ticket `id`.
 * @returns {NextResponse} 200 with the ticket, 404 if not found, or 500 on error.
 */
export async function GET(req: Request, { params }: { params: Params }) {
  try {
    // Ensure a live MongoDB connection before querying.
    await connectMongo();

    // Look up the ticket by its primary key.
    const ticket = await Ticket.findById(params.id);

    // Return a clear 404 when the document does not exist.
    if (!ticket) {
      return Res.json(
        {
          success: false,
          message: "Ticket not found",
        },
        { status: 404 },
      );
    }

    return Res.json({
      success: true,
      message: "Ticket fetched successfully",
      ticket,
    });
  } catch (error) {
    return Res.json(
      {
        success: false,
        message: "Error fetching ticket",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/tickets/[id]
 *
 * Permanently deletes a single ticket document by its MongoDB ObjectId.
 * Returns the deleted document so the caller can confirm what was removed.
 *
 * @param {Request} req      - Incoming Next.js request (unused but required by the signature).
 * @param {{ params: Params }} context - Route params containing the ticket `id`.
 * @returns {NextResponse} 200 with the deleted ticket, 404 if not found, or 500 on error.
 */
export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    // Ensure a live MongoDB connection before writing.
    await connectMongo();

    // Attempt to find and delete the document in a single atomic operation.
    const ticket = await Ticket.findByIdAndDelete(params.id);

    // If no document was matched, inform the caller with a 404.
    if (!ticket) {
      return Res.json(
        {
          success: false,
          message: "Ticket not found",
        },
        { status: 404 },
      );
    }

    return Res.json({
      success: true,
      message: "Ticket deleted successfully",
      deletedTicket: ticket,
    });
  } catch (error) {
    return Res.json(
      {
        success: false,
        message: "Error deleting ticket",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/tickets/[id]
 *
 * Updates an existing ticket document with the fields provided in the request body.
 * Mongoose validators are re-run on the updated values (`runValidators: true`).
 * The response contains the document state AFTER the update (`new: true`).
 *
 * @param {Request} req      - Incoming Next.js request containing the update payload.
 * @param {{ params: Params }} context - Route params containing the ticket `id`.
 * @returns {NextResponse} 200 with the updated ticket, 404 if not found, or 500 on error.
 */
export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    // Ensure a live MongoDB connection before writing.
    await connectMongo();

    // Parse the partial or full update payload from the request body.
    const body = await req.json();

    const ticket = await Ticket.findByIdAndUpdate(params.id, body, {
      new: true,           // Return the document as it looks AFTER the update.
      runValidators: true, // Re-validate updated fields against the schema rules.
    });

    // No document matched the given ID — return a 404.
    if (!ticket) {
      return Res.json(
        {
          success: false,
          message: "Ticket not found",
        },
        { status: 404 },
      );
    }

    return Res.json({
      success: true,
      message: "Ticket updated successfully",
      updatedTicket: ticket,
    });
  } catch (error) {
    return Res.json(
      {
        success: false,
        message: "Error updating ticket",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
