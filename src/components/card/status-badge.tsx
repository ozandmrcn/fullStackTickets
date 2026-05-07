/**
 * @file status-badge.tsx
 * @description Displays a small coloured pill that communicates the current
 *              workflow status of a ticket at a glance.
 *              The colour is looked up from the `STATUS_COLORS` map in constants
 *              to keep colour assignments consistent across the application.
 */

import { STATUS_COLORS } from "@/utils/constants";
import { FC } from "react";

/** Component props — accepts only the three valid ticket status strings. */
interface Props {
  status: "Resolved" | "In Progress" | "Pending";
}

/**
 * StatusBadge
 *
 * Renders a rounded pill with a background colour that corresponds to the
 * ticket status:
 * - **Pending**     → yellow
 * - **In Progress** → blue
 * - **Resolved**    → green
 *
 * @param {Props} props - Contains the ticket `status` string.
 */
const StatusBadge: FC<Props> = ({ status }) => {
  // Resolve the Tailwind background colour class for the given status.
  const color = STATUS_COLORS[status];

  return (
    <div className={`${color} text-white px-3 py-1 text-xs rounded-full`}>
      {status}
    </div>
  );
};

export default StatusBadge;
