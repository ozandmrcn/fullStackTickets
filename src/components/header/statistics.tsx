/**
 * @file statistics.tsx  (components/header)
 * @description Async Server Component that fetches key ticket metrics and
 *              displays them in a compact bar directly below the main header.
 *              Rendered inside a `<Suspense>` boundary so the rest of the header
 *              is visible immediately while this component loads.
 *
 *              Displayed metrics:
 *              - Total active tickets
 *              - Resolved ticket count
 *              - Pending ticket count  (hidden on small screens)
 *              - Average priority score
 */

import { fetchStatistics } from "@/utils/db-logic";
import { FC } from "react";

/**
 * Statistics (Header Statistics Bar)
 *
 * Fetches statistics on the server and renders four colour-coded metric cards
 * in a responsive grid.  Each card uses a muted tinted background to visually
 * differentiate the metric type at a glance.
 */
const Statistics: FC = async () => {
  // Destructure only the values needed for the header bar directly from the DB.
  const { totalTickets, ticketsByStatus, averagePriority } =
    await fetchStatistics();

  return (
    <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 px-6 bg-zinc-900 border-b border-zinc-800">
      {/* Total tickets — blue tint */}
      <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg">
        <div className="text-2xl font-bold">{totalTickets}</div>
        <div className="text-xs text-blue-400/70">Active Tickets</div>
      </div>

      {/* Resolved tickets — green tint */}
      <div className="bg-green-900/20 text-green-400 p-3 rounded-lg">
        <div className="text-2xl font-bold">
          {/* Fall back to 0 when no tickets have been resolved yet */}
          {ticketsByStatus["Resolved"] || 0}
        </div>
        <div className="text-xs text-green-400/70">Resolved</div>
      </div>

      {/* Pending tickets — yellow tint (hidden on mobile to save space) */}
      <div className="bg-yellow-900/20 text-yellow-400 p-3 rounded-lg max-md:hidden">
        <div className="text-2xl font-bold">
          {ticketsByStatus["Pending"] || 0}
        </div>
        <div className="text-xs text-yellow-400/70">Pending</div>
      </div>

      {/* Average priority — purple tint */}
      <div className="bg-purple-900/20 text-purple-400 p-3 rounded-lg">
        <div className="text-2xl font-bold">{averagePriority}</div>
        <div className="text-xs text-purple-400/70">Avg. Priority</div>
      </div>
    </div>
  );
};

export default Statistics;
