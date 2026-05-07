/**
 * @file doughnut-chart.tsx
 * @description Client-side wrapper around the `react-chartjs-2` Doughnut chart.
 *              Accepts a key-value record (e.g. category → count) and transforms
 *              it into the data structure expected by Chart.js.
 *
 *              Marked "use client" because Chart.js requires access to the browser
 *              canvas API, which is not available during server-side rendering.
 */

"use client";

import { FC } from "react";
// Auto-registers all Chart.js components (scales, elements, plugins, etc.)
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

/**
 * Component props.
 * `value` is a generic key-value map where keys are label strings (e.g. category
 * names or status strings) and values are the corresponding numeric counts.
 */
interface Props {
  value: Record<string, number>;
}

/**
 * DoughnutChart
 *
 * Converts a plain object into a Chart.js-compatible dataset and renders a
 * doughnut chart inside a styled container card.
 *
 * Colour arrays are intentionally longer than the maximum expected segment count
 * so the chart never renders a segment without a colour.
 *
 * @param {Props} props - Contains the `value` map to visualise.
 */
const DoughnutChart: FC<Props> = ({ value }) => {
  const data = {
    // Chart labels are derived from the object keys (e.g. "Software Issue").
    labels: Object.keys(value),
    datasets: [
      {
        label: "Ticket Count",
        // Data points are the numeric values (e.g. ticket counts per category).
        data: Object.values(value),
        // Semi-transparent fill colours for each doughnut segment.
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        // Solid border colours that match the fill hues for a crisp outline.
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-700 hover:shadow-md grid place-items-center">
      <Doughnut data={data} className="w-full h-full" />
    </div>
  );
};

export default DoughnutChart;
