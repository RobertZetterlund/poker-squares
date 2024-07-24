import { getScore } from "@/app/actions";
import { memo, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "./BarChart";

export const Scores = memo<{ dateStr: string }>(
  function Scores({ dateStr }) {
    const { data, isLoading } = useQuery({
      queryKey: [dateStr],
      queryFn: async () => {
        return getScore(dateStr);
      },
    });

    if (isLoading || !data) {
      return null;
    }

    console.info("rer");

    return <BarChart data={data} />;
  },
  (prev, curr) => {
    return prev.dateStr === curr.dateStr;
  }
);
