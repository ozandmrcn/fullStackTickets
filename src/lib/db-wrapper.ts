/**
 * @file db-wrapper.ts
 * @description Higher-Order Function (HOF) that wraps database operations.
 *              Handles MongoDB connection and error management in a single place.
 */

import connectMongo from "@/utils/connect-mongo";

/**
 * A Higher-Order Function that ensures a MongoDB connection is active
 * before executing the provided database task.
 * 
 * @param task - The async function containing the database logic.
 * @returns A wrapped version of the task.
 */
export const withDatabase = <T extends any[], R>(
  task: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    // 1. Ensure DB connection
    await connectMongo();

    try {
      // 2. Execute the actual logic
      return await task(...args);
    } catch (error) {
      // 3. Centralized error logging
      console.error("Database Task Error:", error);
      throw error;
    }
  };
};
