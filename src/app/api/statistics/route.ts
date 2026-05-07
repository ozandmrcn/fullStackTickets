/**
 * @file route.ts  (GET /api/statistics)
 * @description API route that computes and returns aggregated statistics
 *              for all tickets stored in the database. Used by the dashboard
 *              to display charts, counters, and trend indicators.
 */

import { getStatsFromDB } from "@/utils/db";
import { NextResponse as Res } from "next/server";

/**
 * GET /api/statistics
 *
 * Provides a snapshot of ticket distributions and key performance indicators (KPIs)
 * to display charts, counters, and trend indicators.
 */
export async function GET(request: Request) {
  try {
    const stats = await getStatsFromDB();
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
