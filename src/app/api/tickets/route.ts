/**
 * @file route.ts  (GET | POST /api/tickets)
 * @description API route handler for the ticket collection resource.
 *              - GET  → retrieves all tickets from the database.
 *              - POST → creates a new ticket from the request body.
 */

import { getTicketsFromDB } from "@/utils/db";
import Ticket from "@/app/api/models/ticket";
import connectMongo from "@/utils/connect-mongo";
import { NextResponse as Res } from "next/server";

/**
 * GET /api/tickets
 *
 * Retrieves every ticket document stored in the database.
 *
 * @returns {NextResponse} 200 with the array of tickets and a result count,
 *                         or 500 if the database query fails.
 */
export async function GET() {
  try {
    const tickets = await getTicketsFromDB();

    return Res.json(
      {
        success: true,
        message: "All tickets fetched successfully",
        results: tickets.length,
        tickets: tickets,
      },
      { status: 200 },
    );
  } catch (error) {
    return Res.json(
      {
        success: false,
        message: "Error fetching tickets",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/tickets
 *
 * Creates a new ticket document using the JSON body of the request.
 * Mongoose schema validation runs automatically during `Ticket.create()`.
 *
 * @param {Request} req - Incoming Next.js request containing the ticket payload.
 * @returns {NextResponse} 201 with the newly created ticket on success,
 *                         or 500 if creation fails (e.g. validation error).
 */
export async function POST(req: Request) {
  try {
    // Ensure a live MongoDB connection before writing.
    await connectMongo();

    // Parse the JSON body sent by the client.
    const body = await req.json();

    // Persist the new ticket; Mongoose validates fields against the schema.
    const newTicket = await Ticket.create(body);

    return Res.json(
      {
        success: true,
        message: "Ticket created successfully",
        newTicket,
      },
      { status: 201 },
    );
  } catch (error) {
    return Res.json(
      {
        success: false,
        message: "Error creating ticket",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
