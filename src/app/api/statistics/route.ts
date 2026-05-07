/**
 * @file route.ts  (GET /api/statistics)
 * @description API route that computes and returns aggregated statistics
 *              for all tickets stored in the database. Used by the dashboard
 *              to display charts, counters, and trend indicators.
 */

import { fetchStatistics } from "@/utils/db-logic";
import { NextResponse as Res } from "next/server";

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
    const stats = await fetchStatistics();
    return Res.json(stats, { status: 200 });
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
