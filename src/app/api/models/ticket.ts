/**
 * @file ticket.ts
 * @description Mongoose model definition for the Ticket resource.
 *              Defines the schema shape, field validations, and transformation
 *              logic applied before sending documents to the client.
 */

import mongoose, { Schema } from "mongoose";

/**
 * TypeScript interface representing the shape of a Ticket document.
 * Used to provide strong typing when working with Mongoose documents.
 */
export interface ITicket {
  title: string;
  description: string;
  category: "Software Issue" | "Hardware Issue" | "Connection Issue" | "Other";
  priority: number;
  progress: number;
  status: "In Progress" | "Pending" | "Resolved";
}

/**
 * Mongoose schema for the Ticket model.
 * Enforces field types, allowed enum values, and required constraints.
 */
const ticketSchema = new Schema<ITicket>(
  {
    /** Short, descriptive title of the ticket (required). */
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    /** Detailed description of the issue or request (required). */
    description: {
      type: String,
      required: [true, "Description is required"],
    },

    /**
     * Category that best describes the type of issue.
     * Restricted to a predefined set of values via enum validation.
     */
    category: {
      type: String,
      enum: {
        values: [
          "Software Issue",
          "Hardware Issue",
          "Connection Issue",
          "Other",
        ],
        message:
          "Category must be Software Issue, Hardware Issue, Connection Issue, or Other",
      },
      required: [true, "Category is required"],
    },

    /**
     * Urgency level of the ticket on a scale of 1 (Very Low) to 5 (Critical).
     * Only integer values 1–5 are accepted.
     */
    priority: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: "Priority must be between 1 and 5",
      },
      required: [true, "Priority is required"],
    },

    /**
     * Completion percentage of the ticket (0–100).
     * Represents how much of the resolution work has been done.
     */
    progress: {
      type: Number,
      min: [0, "Progress must be at least 0"],
      max: [100, "Progress cannot exceed 100"],
      required: [true, "Progress is required"],
    },

    /**
     * Current workflow state of the ticket.
     * Determines whether the issue is being worked on, awaiting action, or closed.
     */
    status: {
      type: String,
      enum: {
        values: ["In Progress", "Pending", "Resolved"],
        message: "Status must be In Progress, Pending, or Resolved",
      },
      required: [true, "Status is required"],
    },
  },
  {
    /** Automatically add `createdAt` and `updatedAt` timestamp fields. */
    timestamps: true,

    /**
     * Disable the internal Mongoose version key (__v) from being
     * included in documents returned to the client.
     */
    versionKey: false,

    toJSON: {
      virtuals: true,
      /**
       * Transform the raw document before serializing to JSON.
       * Removes the internal `_id` field so clients receive the virtual `id` instead.
       */
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },

    /** Enable virtual fields (e.g. `id`) when converting documents to plain objects. */
    toObject: {
      virtuals: true,
    },
  },
);

/**
 * Ticket model.
 * Re-uses an existing compiled model in development (hot-reload safe) or
 * compiles a new one if it does not yet exist on the mongoose connection.
 */
const Ticket =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;
