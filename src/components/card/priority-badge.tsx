/**
 * @file priority-badge.tsx
 * @description Displays a row of five flame icons that visually represent
 *              a ticket's priority level (1 = Very Low, 5 = Critical).
 *              Flames up to and including the priority value are highlighted
 *              in red; the rest are shown in gray.
 */

import { Flame } from "lucide-react";
import { FC } from "react";

/** Component props — expects a numeric priority value between 1 and 5. */
interface Props {
  priority: number;
}

/**
 * PriorityBadge
 *
 * Renders five `<Flame>` icons side by side.
 * An icon is coloured red when its zero-based index is less than `priority`,
 * giving an intuitive "filled out of 5" visual indicator.
 *
 * @param {Props} props - Contains the ticket priority (1–5).
 */
const PriorityBadge: FC<Props> = ({ priority }) => {
  // Create an array of 5 empty strings — only the indices are used.
  const arr = new Array(5).fill("");

  return (
    <div className="flex">
      {arr.map((i, key) => (
        // Highlight flames whose index falls within the priority range.
        <Flame key={key} className={`${priority > key ? "text-red-500" : "text-gray-500"} size-5`} />
      ))}
    </div>
  );
};

export default PriorityBadge;
