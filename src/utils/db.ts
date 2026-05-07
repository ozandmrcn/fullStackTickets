/**
 * @file db.ts
 * @description Simple database utilities. 
 *              Used for direct database access within Server Components.
 */

import Ticket from "@/app/api/models/ticket";
import connectMongo from "@/utils/connect-mongo";
import { Ticket as TicketType } from "@/types";

/**
 * Fetches all tickets directly from the database.
 */
export async function getTicketsFromDB(): Promise<TicketType[]> {
  await connectMongo(); // Connect to DB
  const tickets = await Ticket.find(); // Find tickets
  return JSON.parse(JSON.stringify(tickets)); // Convert to plain objects for Next.js
}

/**
 * Calculates statistics for the dashboard.
 */
export async function getStatsFromDB() {
  await connectMongo();
  const tickets = await Ticket.find();

  const totalTickets = tickets.length;

  // Aggregate counts by category
  const ticketsByCategory = tickets.reduce((acc: any, ticket: any) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {});

  // Aggregate counts by status
  const ticketsByStatus = tickets.reduce((acc: any, ticket: any) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  // Other calculations
  const completedTickets = tickets.filter((t: any) => t.status === "Resolved").length;
  const completionRate = totalTickets > 0 ? Number(((completedTickets / totalTickets) * 100).toFixed(1)) : 0;
  const averagePriority = totalTickets > 0 
    ? Number((tickets.reduce((acc: number, t: any) => acc + t.priority, 0) / totalTickets).toFixed(1))
    : 0;

  return {
    totalTickets,
    ticketsByCategory,
    ticketsByStatus,
    completionRate,
    averagePriority,
    // Time-based data for the dashboard
    ticketsCreatedToday: tickets.filter((t: any) => new Date(t.createdAt) >= new Date(new Date().setHours(0,0,0,0))).length,
    ticketsCreatedThisWeek: tickets.filter((t: any) => new Date(t.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    ticketsCreatedThisYear: tickets.filter((t: any) => new Date(t.createdAt) >= new Date(new Date().getFullYear(), 0, 1)).length,
  };
}

/**
 * Fetches a single ticket by ID.
 */
export async function getTicketByIdFromDB(id: string): Promise<TicketType | null> {
  await connectMongo();
  const ticket = await Ticket.findById(id);
  if (!ticket) return null;
  return JSON.parse(JSON.stringify(ticket));
}
