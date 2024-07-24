import React, { useMemo } from "react";
import { Chart } from "react-google-charts";

export function BarChart({ data }: { data: Record<number, number> }) {
  const normalizedData = useMemo(() => {
    const numbers = Object.entries(data)
      .sort(([aScore], [bScore]) => {
        return Number(aScore) - Number(bScore);
      })
      .map(([score, freq]) => [
        Number(score),
        Number(freq),
        `${freq} users got ${score} point(s)`,
      ]);
    return [["", "frequency", { type: "string", role: "tooltip" }], ...numbers];
  }, [data]);

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="75%"
      data={normalizedData}
      options={{}}
    />
  );
}
