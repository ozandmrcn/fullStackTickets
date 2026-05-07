/**
 * @file progress-bar.tsx
 * @description Displays a horizontal progress bar that visualises how much
 *              of the ticket's resolution work has been completed (0–100%).
 *              The fill uses a gradient from blue to green for a polished look.
 */

import { FC } from "react";

/** Component props — expects a numeric progress value between 0 and 100. */
interface Props {
  progress: number;
}

/**
 * ProgressBar
 *
 * Renders a full-width track with a filled portion whose width is set via
 * an inline style so Tailwind's JIT compiler does not need to generate
 * arbitrary width utilities at build time.
 *
 * @param {Props} props - Contains the completion `progress` percentage.
 */
const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <div className="w-full">
      {/* Label row: "Progress" on the left, percentage value on the right */}
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      {/* Track — dark background representing the unfilled portion */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        {/*
         * Fill — width is driven by the `progress` prop via an inline style.
         * The smooth transition animates changes when the value updates.
         */}
        <div
          style={{ width: `${progress}%` }}
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition duration-500"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
