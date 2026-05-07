/**
 * @file submit-btn.tsx
 * @description Form submission button shared by the ticket create and edit forms.
 *              The button label changes based on whether the form is in create
 *              or edit (save) mode, keeping the UI contextually accurate.
 */

import { FC } from "react";

/**
 * Component props.
 * @property {boolean} mode - When `true` the form is in edit mode ("Save"),
 *                            when `false` it is in create mode ("Create").
 */
interface Props {
  mode: boolean;
}

/**
 * SubmitButton
 *
 * A full-width submit button styled with a blue background.
 * The `disabled` styles (opacity + cursor) are included via Tailwind so the
 * button degrades gracefully if it is programmatically disabled in the future.
 *
 * @param {Props} props - The current form mode (create vs. edit).
 */
const SubmitButton: FC<Props> = ({ mode }) => {
  return (
    <button className="bg-blue-600 mt-5 p-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[42px]">
      {/* Label is contextual: "Save" when editing an existing ticket, "Create" for new ones */}
      {mode ? "Save" : "Create"}
    </button>
  );
};

export default SubmitButton;
