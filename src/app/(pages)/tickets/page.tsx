/**
 * @file page.tsx  (/tickets)
 * @description Tickets list page.
 *              Renders a header section and delegates the actual data-fetching
 *              and grid rendering to the `TicketsGrid` async component, which is
 *              wrapped in a `<Suspense>` boundary so a skeleton loader is shown
 *              while the database query is in flight.
 */

import { FC, Suspense } from "react";
import TicketsGrid from "./tickets-grid";
import Loading from "./loading";

export const dynamic = "force-dynamic";

/**
 * Tickets List Page.
 *
 * This component is intentionally kept synchronous — it owns the page shell
 * (heading + description) while `TicketsGrid` handles the async data layer.
 * Separating concerns this way allows Next.js to stream the shell to the
 * browser immediately and replace the `<Loading />` fallback once data arrives.
 */
const Page: FC = () => {
  return (
    <div>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Ticket List</h1>
        <p className="text-gray-400">
          View and manage all tickets categorized by type
        </p>
      </div>

      {/*
       * Suspense boundary — shows <Loading /> until TicketsGrid finishes
       * fetching tickets from the database and resolves its async render.
       */}
      <Suspense fallback={<Loading />}>
        <TicketsGrid />
      </Suspense>
    </div>
  );
};

export default Page;
