/**
 * @file db-logic.ts
 * @description Centralized database logic that can be called directly by 
 *              Server Components or through API routes. This avoids the 
 *              unnecessary overhead and complexity of fetching via HTTP 
 *              from within the same server environment.
 */

import Ticket from "@/app/api/models/ticket";
import connectMongo from "@/utils/connect-mongo";
import { Ticket as TicketType } from "@/types";

/**
 * Fetches all tickets directly from MongoDB.
 */
export async function fetchAllTickets(): Promise<TicketType[]> {
  await connectMongo();
  const tickets = await Ticket.find();
  return JSON.parse(JSON.stringify(tickets)); // Ensure plain objects for Server Components
}

/**
 * Calculates all dashboard statistics directly from MongoDB.
 */
export async function fetchStatistics() {
  await connectMongo();
  const tickets = await Ticket.find();

  const totalTickets = tickets.length;

  const ticketsByCategory = tickets.reduce((acc: Record<string, number>, ticket: any) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {});

  const ticketsByStatus = tickets.reduce((acc: Record<string, number>, ticket: any) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  const completedTickets = tickets.filter(
    (ticket: any) => ticket.status === "Resolved",
  ).length;

  const completionRate =
    totalTickets > 0
      ? Number(((completedTickets / totalTickets) * 100).toFixed(1))
      : 0;

  const criticalTickets = tickets.filter(
    (ticket: any) => ticket.priority >= 4,
  ).length;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisYear = new Date(now.getFullYear(), 0, 1);

  const ticketsCreatedToday = tickets.filter(
    (ticket: any) => new Date(ticket.createdAt) >= today,
  ).length;

  const ticketsCreatedThisWeek = tickets.filter(
    (ticket: any) => new Date(ticket.createdAt) >= thisWeek,
  ).length;

  const ticketsCreatedThisMonth = tickets.filter(
    (ticket: any) => new Date(ticket.createdAt) >= thisMonth,
  ).length;

  const ticketsCreatedThisYear = tickets.filter(
    (ticket: any) => new Date(ticket.createdAt) >= thisYear,
  ).length;

  const averagePriority = totalTickets > 0 
    ? Number((tickets.reduce((acc: number, ticket: any) => acc + ticket.priority, 0) / totalTickets).toFixed(1))
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
}

/**
 * Fetches a single ticket by ID directly from MongoDB.
 */
export async function fetchTicketById(id: string): Promise<TicketType | null> {
  await connectMongo();
  const ticket = await Ticket.findById(id);
  if (!ticket) return null;
  return JSON.parse(JSON.stringify(ticket));
}
