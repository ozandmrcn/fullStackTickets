/**
 * @file service.ts
 * @description Client-side data-fetching helpers that communicate with the
 *              internal Next.js API routes. Each function wraps a `fetch` call
 *              and returns the parsed JSON response typed against the shared
 *              response types defined in `@/types`.
 *
 *              `APP_URL` is read from an environment variable so the same code
 *              works in both local development and production deployments.
 */

import {
  MessageResponse,
  StatisticsReponse,
  TicketResponse,
  TicketsResponse,
} from "@/types";

/**
 * Base URL of the application.
 * In production (Vercel), we prioritize NEXT_PUBLIC_APP_URL or VERCEL_URL.
 * Falls back to localhost in development.
 */
const getAppUrl = () => {
  // In the browser, we should use relative URLs (e.g., /api/tickets) 
  // to ensure requests always go to the current domain.
  if (typeof window !== "undefined") {
    return "";
  }

  const publicUrl = process.env.NEXT_PUBLIC_APP_URL;
  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

  // If we are in production and the URL is localhost, it's definitely wrong.
  // We should fallback to VERCEL_URL or the actual production domain.
  if (publicUrl && !(isProduction && publicUrl.includes("localhost"))) {
    return publicUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

const APP_URL = getAppUrl();

/**
 * Resolves after the given number of milliseconds.
 * Useful for artificially delaying responses during development or testing
 * loading-state UI components.
 *
 * @param {number} [ms=1500] - Duration to wait in milliseconds.
 */
export const wait = async (ms: number = 1500) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetches aggregated ticket statistics from the API.
 * Results are always fresh (`cache: "no-store"`) because statistics change
 * every time a ticket is created, updated, or deleted.
 *
 * @returns {StatisticsReponse} Parsed statistics object.
 */
export const getStatistics = async (): StatisticsReponse => {
  try {
    const res = await fetch(`${APP_URL}/api/statistics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error fetching statistics: ${res.status} ${res.statusText} - ${errorText}`);
      throw new Error(`Failed to fetch statistics: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch statistics failed:", error);
    throw error;
  }
};

/**
 * Fetches the full list of tickets from the API.
 * Results bypass the Next.js cache to ensure the most current data is displayed.
 *
 * @returns {TicketsResponse} Object containing the tickets array and a message.
 */
export const getTickets = async (): TicketsResponse => {
  try {
    const res = await fetch(`${APP_URL}/api/tickets`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error fetching tickets: ${res.status} ${res.statusText} - ${errorText}`);
      throw new Error(`Failed to fetch tickets: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch tickets failed:", error);
    throw error;
  }
};

/**
 * Sends a DELETE request to permanently remove the ticket with the given ID.
 *
 * @param {string} id - The MongoDB ObjectId of the ticket to delete.
 * @returns {MessageResponse} Object containing a confirmation message.
 */
export const deleteTicket = async (id: string): MessageResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

/**
 * Fetches a single ticket by its MongoDB ObjectId.
 *
 * @param {string} id - The MongoDB ObjectId of the ticket to retrieve.
 * @returns {TicketResponse} Object containing the ticket and a message.
 */
export const getTicket = async (id: string): TicketResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`, {});

  return res.json();
};
