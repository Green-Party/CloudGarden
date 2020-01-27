import React from "react";
import "../Dashboard.css";
import { Layer } from "sancho";
type PercentChartProps = { percent: number };
enum StatusColour {
  EXCELLENT = "#a2d28f",
  OK = "#f5c78e",
  POOR = "#fea58e"
}
export default ({ percent }: PercentChartProps) => {
  const percentString = `${percent} ${100 - percent}`;
  const statusColour =
    percent <= 33
      ? StatusColour.POOR
      : percent <= 66
      ? StatusColour.OK
      : StatusColour.EXCELLENT;
  return (
    <Layer elevation="lg" className="percent-chart-layer">
      <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
        <circle
          className="donut-hole"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="#fff"
        ></circle>
        <circle
          className="donut-ring"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#d2d3d4"
          strokeWidth="3"
        ></circle>

        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={statusColour}
          strokeWidth="3"
          strokeDasharray={percentString}
          strokeDashoffset="25"
          strokeLinecap="round"
        ></circle>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          dy=".1em"
        >
          {percent}
        </text>
      </svg>
    </Layer>
  );
};
