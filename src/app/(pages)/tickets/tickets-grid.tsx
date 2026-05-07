/**
 * @file tickets-grid.tsx
 * @description Async Server Component that fetches all tickets and renders them
 *              in a grouped grid — one section per unique category, sorted
 *              alphabetically.  Each section shows a category heading, a ticket
 *              count badge, and a responsive card grid.
 */

import { fetchAllTickets } from "@/utils/db-logic";
import TicketCard from "@/components/card";
import { Ticket } from "@/types";

/**
 * TicketsGrid
 *
 * Fetches the full ticket list, extracts unique categories (sorted A–Z),
 * then renders each category as a labelled section containing the relevant
 * `<TicketCard>` components.
 *
 * This component is intentionally **async** so Next.js can stream its output
 * while the parent page shell is already visible to the user.
 */
const TicketsGrid = async () => {
  const tickets = await fetchAllTickets();

  // Derive a sorted, deduplicated list of categories present in the current data.
  const categories = [...new Set(tickets.map((i: Ticket) => i.category))].sort();

  return (
    <div className="space-y-8">
      {categories.map((category, key) => {
        // Filter tickets that belong to the current category section.
        const categoryTickets = tickets.filter(
          (ticket: Ticket) => ticket.category === category,
        );

        return (
          <div className="mb-8" key={key}>
            {/* Category section header with title and ticket count badge */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                {/* Vertical accent bar for visual separation */}
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                {category}
              </h2>

              {/* Pill showing how many tickets belong to this category */}
              <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                {categoryTickets.length} ticket
              </span>
            </div>

            {/* Responsive card grid — 1 column on mobile, 2 on md+ */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-">
              {categoryTickets.map((ticket) => (
                <TicketCard ticket={ticket} key={ticket.id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketsGrid;
