/**
 * @file dashboard-value.tsx
 * @description A compact metric card used on the Dashboard page to display
 *              a single time-based statistic (e.g. tickets created today).
 *              Each card shows an icon, a label, and a large numeric value.
 */

import { FC, ReactNode } from "react";

/**
 * Component props.
 * @property {ReactNode} icon  - A Lucide (or any React) icon element rendered at the top-left.
 * @property {string}    label - Short descriptor shown below the icon (e.g. "Today").
 * @property {number | string} value - The statistic to display prominently.
 */
interface Props {
  icon: ReactNode;
  label: string;
  value: number | string;
}

/**
 * DashboarValue (Dashboard Value Card)
 *
 * Renders a visually distinct card intended to highlight a key metric on the
 * dashboard.  The icon and label sit at the top, and the value is displayed
 * in large, bold text to draw the user's attention immediately.
 *
 * @param {Props} props - Icon, label, and numeric/string value to render.
 */
const DashboarValue: FC<Props> = ({ icon, label, value }) => {
  return (
    <div className="bg-zinc-900 rounded-xl shadow-sm border-zinc-700 hover:shadow-md transition group p-6">
      {/* Top row: icon on the left, label on the right */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 size-5">{icon}</div>
        <h3 className="text-sm text-gray-400">{label}</h3>
      </div>

      {/* Large metric value displayed prominently */}
      <div className="text-3xl font-bold text-gray-100 mb-1">{value}</div>
    </div>
  );
};

export default DashboarValue;
