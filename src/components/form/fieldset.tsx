/**
 * @file fieldset.tsx
 * @description A reusable form field wrapper that renders a labelled `<fieldset>`
 *              element.  Wrapping inputs in a `<fieldset>` provides semantic
 *              grouping that improves accessibility for screen readers.
 *              A red asterisk (*) is appended to every label to indicate that
 *              all wrapped fields are required.
 */

import { FC } from "react";

/**
 * Component props.
 * @property {React.ReactNode} children - The form control(s) to render inside the fieldset.
 * @property {string} label             - Human-readable field name displayed above the control.
 */
interface Props {
  children: React.ReactNode;
  label: string;
}

/**
 * Fieldset
 *
 * Renders a semantic `<fieldset>` with a `<label>` and the provided child
 * form control (input, select, textarea, etc.).  The red asterisk is purely
 * visual — validation enforcement is handled by the `required` attribute on
 * the actual input elements.
 *
 * @param {Props} props - Label text and child form control(s).
 */
const Fieldset: FC<Props> = ({ children, label }) => {
  return (
    <fieldset>
      {/* Field label with a required-field indicator */}
      <label className="block text-sm mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      {children}
    </fieldset>
  );
};

export default Fieldset;
