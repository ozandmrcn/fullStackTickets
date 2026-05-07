/**
 * @file index.tsx  (components/card)
 * @description TicketCard component — the primary display unit for a single ticket.
 *              Renders ticket metadata (title, description, category, priority,
 *              progress, status, and timestamps) inside a styled card container.
 *              Clicking the title navigates to the ticket detail/edit page.
 */

import { Ticket } from "@/types";
import { FC } from "react";
import PriorityBadge from "./priority-badge";
import DeleteButton from "./delete-button";
import Link from "next/link";
import ProgressBar from "./progress-bar";
import { Calendar, Clock } from "lucide-react";
import StatusBadge from "./status-badge";
import { DATE_FORMATS } from "@/utils/constants";

/** Component props — expects a fully typed Ticket object. */
interface Props {
  ticket: Ticket;
}

/**
 * TicketCard
 *
 * Displays a compact summary of a ticket with the following sections:
 * - **Header**: priority flame icons + optional "New" badge + delete button (visible on hover)
 * - **Body**:   clickable title, truncated description, category pill, progress bar
 * - **Footer**: created/updated timestamps and a coloured status badge
 *
 * @param {Props} props - Contains the ticket data to render.
 */
const TicketCard: FC<Props> = ({ ticket }) => {
  // Format dates using the locale-aware options defined in constants.
  const createdDate = new Date(ticket.createdAt).toLocaleDateString(
    "en-US",
    DATE_FORMATS.display,
  );
  const updatedDate = new Date(ticket.updatedAt).toLocaleDateString(
    "en-US",
    DATE_FORMATS.short,
  );

  /**
   * A ticket is considered "recent" if it was created within the last 24 hours.
   * Recent tickets display a green "New" badge to draw the user's attention.
   */
  const isRecent =
    new Date(ticket.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <div className="group bg-zinc-800 rounded-xl shadow-sm hover:shadow-md shadow-zinc-900/20 transition border border-zinc-700 hover:border-zinc-600 overflow-hidden">
      {/* ── Card header: priority, "New" badge, delete button ── */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Visual priority indicator (1–5 flame icons) */}
            <PriorityBadge priority={ticket.priority} />

            {/* "New" badge — shown only when the ticket is less than 24 hours old */}
            {isRecent && (
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                New
              </div>
            )}
          </div>

          {/* Delete button — fades in on hover to keep the UI clean */}
          <div className="opacity-0 group-hover:opacity-100 transition">
            <DeleteButton id={ticket.id} />
          </div>
        </div>

        {/* ── Clickable title & description ── */}
        <Link href={`/ticket/${ticket.id}`} className="block">
          <h3 className="font-semibold text-gray-100 mb-2 line-clamp-1 group-hover:text-blue-400 transition">
            {ticket.title}
          </h3>

          {/* Description is clamped to 2 lines to keep cards uniform in height */}
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
            {ticket.description}
          </p>
        </Link>

        {/* ── Category pill ── */}
        <div className="mb-3">
          <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md">
            {ticket.category}
          </span>
        </div>

        {/* ── Progress bar (0–100%) ── */}
        <div className="mb-3">
          <ProgressBar progress={ticket.progress} />
        </div>
      </div>

      {/* ── Card footer: timestamps + status badge ── */}
      <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700">
        <div className="flex items-center justify-between">
          {/* Created and last-updated dates */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="size-3" />
              <span>Created: {createdDate}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="size-3" />
              <span>Updated: {updatedDate}</span>
            </div>
          </div>

          {/* Coloured status pill (Pending / In Progress / Resolved) */}
          <StatusBadge status={ticket.status} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
