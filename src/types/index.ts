/**
 * @file index.ts  (src/types)
 * @description Shared TypeScript types used across both client and server code.
 *              Keeping types in one place ensures a single source of truth and
 *              avoids duplication between API routes, server actions, and UI components.
 */

/**
 * Distribution of tickets across the four supported categories.
 * All properties are optional because a category may have zero tickets.
 */
export type CategoryType = {
  "Software Issue"?: number;
  "Hardware Issue"?: number;
  "Connection Issue"?: number;
  Other?: number;
};

/**
 * Distribution of tickets across the three workflow statuses.
 * All properties are optional because a status bucket may be empty.
 */
export type StatusType = {
  "In Progress"?: number;
  Pending?: number;
  Resolved?: number;
};

/**
 * Full statistics payload returned by GET /api/statistics.
 * Used by the dashboard page and the header statistics bar.
 */
export type Statistics = {
  /** Total number of tickets in the database. */
  totalTickets: number;
  /** Count of tickets grouped by category. */
  ticketsByCategory: CategoryType;
  /** Count of tickets grouped by status. */
  ticketsByStatus: StatusType;
  /** Percentage of tickets whose status is "Resolved" (0–100). */
  completionRate: number;
  /** Number of tickets with priority 4 (High) or 5 (Critical). */
  criticalTickets: number;
  /** Tickets created since midnight today. */
  ticketsCreatedToday: number;
  /** Tickets created in the last 7 days. */
  ticketsCreatedThisWeek: number;
  /** Tickets created since the first day of the current month. */
  ticketsCreatedThisMonth: number;
  /** Tickets created since the first day of the current year. */
  ticketsCreatedThisYear: number;
  /** Mean priority level across all tickets, rounded to one decimal place. */
  averagePriority: number;
};

/** Union type of all valid ticket category strings. */
export type TicketCategory =
  | "Software Issue"
  | "Hardware Issue"
  | "Connection Issue"
  | "Other";

/** Union type of all valid ticket status strings. */
export type TicketStatus = "In Progress" | "Pending" | "Resolved";

/**
 * Represents a single Ticket document as returned by the API.
 * The `id` field is the virtual string representation of the MongoDB `_id`.
 */
export type Ticket = {
  title: string;
  description: string;
  category: TicketCategory;
  priority: number;
  progress: number;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  id: string;
};

// ── API Response Types ────────────────────────────────────────────────────────

/** Return type of `getStatistics()`. */
export type StatisticsReponse = Promise<Statistics>;

/** Return type of `getTicket(id)`. */
export type TicketResponse = Promise<{
  message: string;
  ticket: Ticket;
}>;

/** Return type of `getTickets()`. */
export type TicketsResponse = Promise<{
  message: string;
  tickets: Ticket[];
}>;

/** Generic API response used for operations that only return a status message (e.g. DELETE). */
export type MessageResponse = Promise<{
  message: string;
}>;
