/**
 * @file route.ts  (GET /api/statistics)
 * @description API route that computes and returns aggregated statistics
 *              for all tickets stored in the database. Used by the dashboard
 *              to display charts, counters, and trend indicators.
 */

import connectMongo from "@/utils/connect-mongo";
import { NextResponse as Res } from "next/server";
import Ticket from "../models/ticket";

/**
 * GET /api/statistics
 *
 * Fetches all tickets from the database and computes the following metrics:
 * - Total ticket count
 * - Breakdown by category and by status
 * - Completion rate (percentage of resolved tickets)
 * - Number of critical tickets (priority >= 4)
 * - Tickets created today, this week, this month, and this year
 * - Average priority across all tickets
 *
 * @returns {NextResponse} 200 with the statistics object, or 500 on error.
 */
export async function GET(request: Request) {
  try {
    // Ensure the MongoDB connection is established before querying.
    await connectMongo();

    // Retrieve every ticket document from the collection.
    const tickets = await Ticket.find();

    // ── Basic counts ──────────────────────────────────────────────────────────

    const totalTickets = tickets.length;

    /**
     * Group tickets by their category and count how many belong to each one.
     * Example result: { "Software Issue": 3, "Hardware Issue": 1 }
     */
    const ticketsByCategory = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;

      return acc;
    }, {});

    /**
     * Group tickets by their current status and count each group.
     * Example result: { "Pending": 2, "Resolved": 1, "In Progress": 1 }
     */
    const ticketsByStatus = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;

      return acc;
    }, {});

    // ── Completion rate ───────────────────────────────────────────────────────

    /** Number of tickets whose status is "Resolved". */
    const completedTickets = tickets.filter(
      (ticket) => ticket.status === "Resolved",
    ).length;

    /**
     * Percentage of resolved tickets out of the total.
     * Returns 0 when there are no tickets to avoid a division-by-zero error.
     * Value is rounded to one decimal place.
     */
    const completionRate =
      totalTickets > 0
        ? Number(((completedTickets / totalTickets) * 100).toFixed(1))
        : 0;

    // ── Critical tickets ──────────────────────────────────────────────────────

    /**
     * Count tickets with priority 4 (High) or 5 (Critical).
     * Used to surface urgent issues that need immediate attention.
     */
    const criticalTickets = tickets.filter(
      (ticket) => ticket.priority >= 4,
    ).length;

    // ── Time-based boundaries ─────────────────────────────────────────────────

    const now = new Date();

    /** Midnight of the current day — used to filter tickets created today. */
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    /** A date exactly 7 days ago — used to filter tickets from the current week. */
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    /** First day of the current calendar month. */
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    /** First day of the current calendar year. */
    const thisYear = new Date(now.getFullYear(), 0, 1);

    // ── Time-based ticket counts ──────────────────────────────────────────────

    const ticketsCreatedToday = tickets.filter(
      (ticket) => new Date(ticket.createdAt) >= today,
    ).length;

    const ticketsCreatedThisWeek = tickets.filter(
      (ticket) => new Date(ticket.createdAt) >= thisWeek,
    ).length;

    const ticketsCreatedThisMonth = tickets.filter(
      (ticket) => new Date(ticket.createdAt) >= thisMonth,
    ).length;

    const ticketsCreatedThisYear = tickets.filter(
      (ticket) => new Date(ticket.createdAt) >= thisYear,
    ).length;

    // ── Average priority ──────────────────────────────────────────────────────

    /**
     * Mean priority value across all tickets, rounded to one decimal place.
     * Gives a quick sense of the overall urgency level of open work.
     */
    const averagePriority = Number(
      (
        tickets.reduce((acc, ticket) => acc + ticket.priority, 0) / totalTickets
      ).toFixed(1),
    );

    // ── Response ──────────────────────────────────────────────────────────────

    return Res.json(
      {
        totalTickets,
        ticketsByCategory,
        ticketsByStatus,
        completionRate,
        criticalTickets,
        ticketsCreatedToday,
        ticketsCreatedThisWeek,
        ticketsCreatedThisMonth,
        ticketsCreatedThisYear,
        averagePriority,
      },
      { status: 200 },
    );
  } catch (error) {
    // Return a descriptive error message so the client can surface it.
    return Res.json(
      {
        message: "Failed to calculate statistics",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
