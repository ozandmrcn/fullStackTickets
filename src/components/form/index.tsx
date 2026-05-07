/**
 * @file index.tsx  (components/form)
 * @description Shared ticket form used for both creating and editing tickets.
 *              The form's `action` prop is dynamically set to the appropriate
 *              Next.js Server Action based on the current mode.
 *
 *              Fields:
 *              - Title       (text input, max 100 chars)
 *              - Description (textarea, max 500 chars)
 *              - Category    (select from predefined list)
 *              - Priority    (radio group, 1–5)
 *              - Progress    (range slider, 0–100 in steps of 5)
 *              - Status      (select from predefined list)
 */

import { Ticket } from "@/types";
import { FC } from "react";
import Fieldset from "./fieldset";
import {
  PRIORITY_LABELS,
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "@/utils/constants";
import SubmitButton from "./submit-btn";
import { createTicketAction, updateTicketAction } from "@/utils/actions";

/**
 * Component props.
 * @property {boolean}      isEditMode - `true` when editing an existing ticket, `false` for new tickets.
 * @property {Ticket | null} editItem  - The ticket data to pre-fill the form with in edit mode.
 *                                       Must be `null` when `isEditMode` is `false`.
 */
interface Props {
  isEditMode: boolean;
  editItem: Ticket | null;
}

/**
 * Form
 *
 * Renders a controlled-free HTML form that submits to a Next.js Server Action.
 * `defaultValue` / `defaultChecked` are used (instead of `value` / `checked`)
 * so React treats the inputs as uncontrolled, which is the recommended pattern
 * when using Server Actions with plain HTML forms.
 *
 * @param {Props} props - Edit mode flag and optional pre-filled ticket data.
 */
const Form: FC<Props> = ({ isEditMode, editItem }) => {
  return (
    <div className="max-w-[600px]">
      {/*
       * The `action` prop wires this form directly to a Server Action.
       * No JavaScript fetch call is needed — the browser submits natively.
       */}
      <form
        action={isEditMode ? updateTicketAction : createTicketAction}
        className="flex flex-col gap-5"
      >
        {/*
         * Hidden input carrying the ticket ID when in edit mode.
         * The Server Action reads this value to identify which document to update.
         */}
        {isEditMode && (
          <input readOnly hidden type="text" name="id" value={editItem?.id} />
        )}

        {/* ── Title ── */}
        <Fieldset label="Title">
          <input
            name="title"
            type="text"
            required
            maxLength={100}
            defaultValue={editItem?.title}
            className="input"
          />
        </Fieldset>

        {/* ── Description ── */}
        <Fieldset label="Description">
          <textarea
            name="description"
            required
            rows={4}
            maxLength={500}
            defaultValue={editItem?.description}
            className="input resize-y min-h-20 max-h-96"
          />
        </Fieldset>

        {/* ── Category (dropdown) ── */}
        <Fieldset label="Category">
          <select
            name="category"
            className="input"
            required
            defaultValue={editItem?.category}
          >
            <option value="">Select Category</option>

            {TICKET_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Fieldset>

        {/* ── Priority (radio group, 1–5) ── */}
        <Fieldset label="Priority">
          <div className="flex flex-wrap gap-3">
            {TICKET_PRIORITIES.map((priority) => (
              <div key={priority} className="flex items-center gap-2">
                <input
                  id={`${priority}`}
                  type="radio"
                  name="priority"
                  value={priority}
                  required
                  defaultChecked={editItem?.priority === priority}
                  className="size-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 "
                />

                {/* Label shows the numeric value and its human-readable equivalent */}
                <label
                  htmlFor={`${priority}`}
                  className="text-sm font-medium cursor-pointer hover:text-blue-400"
                >
                  {priority} - {PRIORITY_LABELS[priority]}
                </label>
              </div>
            ))}
          </div>
        </Fieldset>

        {/* ── Progress (range slider 0–100, step 5) ── */}
        <Fieldset label={`Progress`}>
          <input
            type="range"
            name="progress"
            min={0}
            max={100}
            step={5}
            defaultValue={editItem?.progress || 0}
          />
        </Fieldset>

        {/* ── Status (dropdown) ── */}
        <Fieldset label="Status">
          <select
            name="status"
            className="input"
            required
            defaultValue={editItem?.status}
          >
            {TICKET_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Fieldset>

        {/* Submit button — label changes between "Create" and "Save" based on mode */}
        <SubmitButton mode={isEditMode} />
      </form>
    </div>
  );
};

export default Form;
