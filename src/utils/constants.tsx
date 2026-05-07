/**
 * @file constants.tsx
 * @description Application-wide constant values used across components and utilities.
 *              Centralising these values here prevents magic strings/numbers from
 *              being scattered throughout the codebase and makes future changes easier.
 */

import { TicketCategory, TicketStatus } from "@/types";
import { House, Ticket, Plus, Users, Mail, ChartArea } from "lucide-react";

/**
 * Navigation items rendered in the Sidebar component.
 * Each item has a human-readable label, a route href, and a Lucide icon component.
 * Items with `href: "#"` are placeholder links for features not yet implemented.
 */
export const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    label: "New Ticket",
    href: "/ticket/add",
    icon: Plus,
  },
  {
    label: "Teams",
    href: "#",
    icon: Users,
  },
  {
    label: "Inbox",
    href: "#",
    icon: Mail,
  },
  {
    label: "Statistics",
    href: "#",
    icon: ChartArea,
  },
];

/**
 * Locale-aware date format options for use with `Date.toLocaleDateString`.
 * - `display` : long month name (e.g. "07 May 2025")
 * - `short`   : abbreviated month name (e.g. "07 May 2025")
 */
export const DATE_FORMATS = {
  display: {
    day: "2-digit" as const,
    month: "long" as const,
    year: "numeric" as const,
  },
  short: {
    day: "2-digit" as const,
    month: "short" as const,
    year: "numeric" as const,
  },
};

/**
 * Tailwind background-color classes mapped to each ticket status value.
 * Used by `StatusBadge` to apply the correct colour without conditional logic.
 */
export const STATUS_COLORS = {
  Pending: "bg-yellow-500",
  "In Progress": "bg-blue-500",
  Resolved: "bg-green-500",
};

/**
 * All valid ticket categories available for selection in the ticket form.
 * Mirrors the enum values defined in the Mongoose schema.
 * Note: "Other" is intentionally excluded here; it is only the schema fallback.
 */
export const TICKET_CATEGORIES: TicketCategory[] = [
  "Software Issue",
  "Hardware Issue",
  "Connection Issue",
];

/**
 * All valid ticket status values available for selection in the ticket form.
 * Mirrors the enum values defined in the Mongoose schema.
 */
export const TICKET_STATUSES: TicketStatus[] = [
  "Pending",
  "In Progress",
  "Resolved",
];

/**
 * Numeric priority levels a ticket can be assigned, from 1 (lowest) to 5 (highest).
 * Declared `as const` so TypeScript treats the values as a readonly tuple of literals.
 */
export const TICKET_PRIORITIES = [1, 2, 3, 4, 5] as const;

/**
 * Human-readable labels for each numeric priority level.
 * The enum is reverse-mapped so `PRIORITY_LABELS[3]` returns `"Medium"`.
 */
export enum PRIORITY_LABELS {
  "Very Low" = 1,
  "Low",
  "Medium",
  "High",
  "Critical",
}
