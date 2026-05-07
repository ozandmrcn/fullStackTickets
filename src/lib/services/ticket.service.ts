/**
 * @file ticket.service.ts
 * @description Professional service layer for Ticket operations.
 *              Uses the withDatabase HOF for clean, abstracted DB access.
 */

import Ticket from "@/app/api/models/ticket";
import { Ticket as TicketType } from "@/types";
import { withDatabase } from "../db-wrapper";

/**
 * Fetches all tickets.
 */
export const fetchAllTickets = withDatabase(async (): Promise<TicketType[]> => {
  const tickets = await Ticket.find();
  return JSON.parse(JSON.stringify(tickets));
});

/**
 * Fetches a single ticket by ID.
 */
export const fetchTicketById = withDatabase(async (id: string): Promise<TicketType | null> => {
  const ticket = await Ticket.findById(id);
  if (!ticket) return null;
  return JSON.parse(JSON.stringify(ticket));
});

/**
 * Calculates dashboard statistics.
 */
export const fetchStatistics = withDatabase(async () => {
  const tickets = await Ticket.find();
  const totalTickets = tickets.length;

  // Logic remains the same, but now it's cleanly abstracted and wrapped
  const ticketsByCategory = tickets.reduce((acc: Record<string, number>, ticket: any) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {});

  const ticketsByStatus = tickets.reduce((acc: Record<string, number>, ticket: any) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  const completedTickets = tickets.filter((t: any) => t.status === "Resolved").length;
  const completionRate = totalTickets > 0 ? Number(((completedTickets / totalTickets) * 100).toFixed(1)) : 0;
  const criticalTickets = tickets.filter((t: any) => t.priority >= 4).length;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisYear = new Date(now.getFullYear(), 0, 1);

  const ticketsCreatedToday = tickets.filter((t: any) => new Date(t.createdAt) >= today).length;
  const ticketsCreatedThisWeek = tickets.filter((t: any) => new Date(t.createdAt) >= thisWeek).length;
  const ticketsCreatedThisMonth = tickets.filter((t: any) => new Date(t.createdAt) >= thisMonth).length;
  const ticketsCreatedThisYear = tickets.filter((t: any) => new Date(t.createdAt) >= thisYear).length;

  const averagePriority = totalTickets > 0 
    ? Number((tickets.reduce((acc: number, t: any) => acc + t.priority, 0) / totalTickets).toFixed(1))
    : 0;

  return {
    totalTickets,
    ticketsByCategory,
    ticketsByStatus,
    completionRate,
    criticalTickets,
    ticketsCreatedToday,
    ticketsCreatedThisWeek,
    ticketsCreatedThisMonth,
    ticketsCreatedThisYear,
    averagePriority,
  };
});
