/**
 * @file page.tsx  (/)
 * @description Dashboard home page.
 *              Fetches aggregated ticket statistics on the server and renders
 *              two doughnut charts (category + status distributions) alongside
 *              three time-based ticket counters (today / this week / this year).
 */

import DashboarValue from "@/components/charts/dashboard-value";
import DoughnutChart from "@/components/charts/doughnut-chart";
import { getStatistics } from "@/utils/service";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

import { FC } from "react";

export const dynamic = "force-dynamic";

/**
 * Home (Dashboard) page component.
 *
 * This is an **async** Server Component — data is fetched at request time
 * and streamed to the client, meaning no client-side loading spinners are needed
 * for the initial render (the Header's `<Suspense>` boundary handles that).
 */
const Home: FC = async () => {
  // Fetch all statistics in a single server-side request before rendering.
  const data = await getStatistics();

  return (
    <div className="p-2 md:p-6 space-y-8">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Overview and analysis of the ticket management system
        </p>
      </div>

      <div className="space-y-8">
        {/* ── Doughnut charts ──────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Distribution of tickets broken down by category */}
          <div>
            <h2 className="font-semibold mb-2 text-lg">
              Category Distribution
            </h2>
            <DoughnutChart value={data.ticketsByCategory} />
          </div>

          {/* Distribution of tickets broken down by current status */}
          <div>
            <h2 className="font-semibold mb-2 text-lg">Status Distribution</h2>

            <DoughnutChart value={data.ticketsByStatus} />
          </div>
        </div>

        {/* ── Time-based counters ──────────────────────────────────────────── */}
        <div>
          <h2 className="font-semibold mb-2 text-lg">Time-Based Analysis</h2>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Tickets opened today */}
            <DashboarValue
              icon={<TrendingUp className="text-green-500" />}
              label="Today"
              value={data.ticketsCreatedToday}
            />
            {/* Tickets opened in the past 7 days */}
            <DashboarValue
              icon={<BarChart3 className="text-blue-500" />}
              label="This Week"
              value={data.ticketsCreatedThisWeek}
            />
            {/* Tickets opened in the current calendar year */}
            <DashboarValue
              icon={<PieChart className="text-purple-500" />}
              label="This Year"
              value={data.ticketsCreatedThisYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
