import React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieAnimation({ audits, auditRatio }) {
  const valueFormatter = (item) => `${item.value}`;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PieChart
        height={300}
        series={[
          {
            data: audits.map((audit, index) => ({
              ...audit,
              color: index === 0 ? "#0047AB" : "#C70039",
            })),
            innerRadius: 100,
            outerRadius: 140,
            arcLabelMinAngle: 20,
            valueFormatter,
            label: ({ cx, cy }) => (
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="18"
                fontWeight="bold"
                fill="black"
              >
                {auditRatio !== null ? `${auditRatio}` : "Loading..."}
              </text>
            ),
            labelPosition: "inside", // Optional: to make sure the label is inside the chart
          },
        ]}
        slotProps={{
          legend: { hidden: false }, // Display legend
        }}
      />
    </Box>
  );
}
