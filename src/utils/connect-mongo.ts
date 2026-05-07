/**
 * @file connect-mongo.ts
 * @description Singleton utility that establishes and reuses a single Mongoose
 *              connection across the entire Next.js application.
 *
 *              Next.js dev mode uses hot-module replacement, which would create
 *              a new connection on every file change unless we cache the promise.
 *              This module solves that problem with a module-level `cached` object.
 */

import mongoose from "mongoose";

/** Connection string read from environment variables at module load time. */
const MONGO_URI = process.env.MONGO_URI;

/**
 * Module-level cache that holds both the resolved connection instance and the
 * in-flight connection promise. Persisted across hot-reloads in development.
 */
const cached: {
  connection?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
} = {};

/**
 * Returns an active Mongoose connection, reusing an existing one when available.
 *
 * Call this at the top of every API route or server action that needs the database.
 *
 * Connection flow:
 *  1. If `cached.connection` already exists → return it immediately (fastest path).
 *  2. If `cached.promise` exists but hasn't resolved yet → await it (prevents
 *     duplicate concurrent connections).
 *  3. Otherwise → start a new connection, store the promise, then await it.
 *
 * If the connection attempt fails the cached promise is cleared so the next call
 * can retry rather than re-awaiting a permanently rejected promise.
 *
 * @throws {Error} When `MONGO_URI` is not defined in the environment.
 * @returns {Promise<typeof mongoose>} The active Mongoose instance.
 */
async function connectMongo(): Promise<typeof mongoose> {
  if (!MONGO_URI) {
    throw new Error("Please define MONGO_URI in .env");
  }

  // Fast path — a connection is already open, return it right away.
  if (cached.connection) {
    return cached.connection;
  }

  // Start a new connection only if there is no pending promise yet.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      /**
       * Disable Mongoose's internal command buffering.
       * Without a live connection, operations will throw instead of silently
       * queuing — making connection errors immediately visible.
       */
      bufferCommands: false,
    });
  }

  try {
    // Await the pending connection promise and store the result.
    cached.connection = await cached.promise;
  } catch (err) {
    // Clear the promise so subsequent calls can attempt a fresh connection.
    cached.promise = undefined;
    throw err;
  }

  return cached.connection;
}

export default connectMongo;
