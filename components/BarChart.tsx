import React, { useMemo } from "react";
import { Chart } from "react-google-charts";

export function BarChart({ data }: { data: Record<number, number> }) {
  const normalizedData = useMemo(() => {
    const sortedNumbers = Object.entries(data).sort(([aScore], [bScore]) => {
      return Number(aScore) - Number(bScore);
    });

    const maxScore = Math.max(
      Number(sortedNumbers.findLast((v) => v[1] > 0)?.[0]) ?? 0,
      20
    );

    const cutOffNumbers = sortedNumbers.filter(([score, frequency]) => {
      return maxScore >= Number(score);
    });

    const numbers = cutOffNumbers.map(([score, freq]) => [
      String(score),
      Number(freq),
      `${freq} users got ${score} point(s)`,
    ]);
    return [["", "frequency", { type: "string", role: "tooltip" }], ...numbers];
  }, [data]);

  return (
    <div className="h-[200px]">
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="200px"
        data={normalizedData}
        loader={<div className="loader" />}
        options={{
          legend: { position: "none" },
          vAxis: { title: "Frequency", minValue: 0, format: "0" },
          hAxis: { title: "Score", minValue: 0 },
          chartArea: {
            width: "85%",
            height: "70%",
          },
        }}
      />
    </div>
  );
}
