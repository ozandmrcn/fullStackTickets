/**
 * @file loading.tsx  (components/header)
 * @description Skeleton placeholder rendered by the `<Suspense>` boundary inside
 *              the Header component while the `Statistics` async component is
 *              fetching data from the API.
 *
 *              The `animate-pulse` class creates a subtle breathing animation
 *              so users understand that content is loading rather than missing.
 */

import { FC } from "react";

/**
 * Loading (Header Statistics Skeleton)
 *
 * Mirrors the grid layout of the real `Statistics` bar — four placeholder cards
 * with the same padding, rounding, and grid structure — so the page does not
 * shift when the real data replaces the skeleton.
 */
const Loading: FC = () => {
  return (
    <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 px-6 bg-zinc-900 border-b border-zinc-800 animate-pulse">
      {/* Each block mirrors one statistics card; text is transparent to hide content */}
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
    </div>
  );
};

export default Loading;
