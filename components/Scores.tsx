import { getAllScores, getScore } from "@/app/actions";
import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "./BarChart";
import { R } from "@tanstack/react-query-devtools/build/legacy/devtools-PtxSnd7z";

export const Scores = memo<{ dateStr: string }>(
  function Scores({ dateStr }) {
    const { isLoading: dayLoading } = useQuery({
      queryKey: [dateStr],
      queryFn: async () => {
        return getScore(dateStr);
      },
    });

    const { isLoading: allLoading } = useQuery({
      queryKey: ["all_games"],
      queryFn: async () => {
        return getAllScores();
      },
    });

    if (dayLoading || allLoading) {
      return (
        <div className="h-[536px] grid place-items-center">
          <div className="loader" />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 h-[536px]">
        <DateScore dateStr={dateStr} />
        <AllScore />
      </div>
    );
  },
  (prev, curr) => {
    return prev.dateStr === curr.dateStr;
  }
);

const DateScore = ({ dateStr }: { dateStr: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [dateStr],
    queryFn: async () => {
      return getScore(dateStr);
    },
  });

  const avgScore = useMemo(() => {
    return getAvgScore(data);
  }, [data]);

  if (isLoading || !data) {
    return null;
  }

  const score = localStorage.getItem(dateStr + "-score");

  return (
    <div>
      <h1>
        <span className="text-xl">Todays deck.</span>
        {score && (
          <>
            <br />
            Avg score: {avgScore}
            <br />
            Your Score: {score}
          </>
        )}
      </h1>
      <BarChart data={data} />
    </div>
  );
};

const AllScore = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all_games"],
    queryFn: async () => {
      return getAllScores();
    },
  });

  const avgScore = useMemo(() => {
    return getAvgScore(data);
  }, [data]);

  if (!data || isLoading) {
    return null;
  }

  return (
    <div>
      <h1>
        <span className="text-xl">All Games.</span>
        {avgScore !== null && (
          <>
            <br />
            Avg score: {avgScore}
          </>
        )}
      </h1>
      <BarChart data={data} />
    </div>
  );
};

const getAvgScore = (
  data: Record<string, number> | undefined
): string | null => {
  if (!data) {
    return null;
  }
  const { cumFrequency, cumScore } = Object.entries(data).reduce(
    (acc, [score, freq]) => {
      const scoredTotal = Number(score) * freq;
      acc.cumFrequency += freq;
      acc.cumScore += scoredTotal;
      return acc;
    },
    { cumScore: 0, cumFrequency: 0 }
  );

  if (cumFrequency === 0) {
    return null;
  }
  return Number(cumScore / cumFrequency).toFixed(2);
};
