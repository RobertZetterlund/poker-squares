"use server";
import { kv } from "@vercel/kv";
export async function submitScore({
  score,
  date,
}: {
  date?: string;
  score: number;
}) {
  if (date) {
    const path = `$["${date}"]['${score}']`;
    kv.json.numincrby("games", path, 1);
  }
  kv.incr("total_games_played");
  kv.json.numincrby("all_games", `$["${score}"]`, 1);
}

export async function getScore(date: string): Promise<Record<string, number>> {
  return (await kv.json.get(`games`, {}, `$["${date}"]`)).at(0);
}

export async function getAllScores(): Promise<Record<string, number>> {
  return await kv.json.get(`all_games`, {});
}

const scoreObj = (() => {
  const res: Record<string, number> = {};
  for (let i = 0; i <= 45; i++) {
    res[i] = 0;
  }
  return JSON.stringify(res);
})();

export const resetJSON = () => {
  for (let dateStr of arr) {
    kv.json.set("games", `$["${dateStr}"]`, scoreObj);
  }
  kv.json.set("all_games", "$", scoreObj);
  kv.set("total_games_played", 0);
};

const arr = [
  "2024-07-24",
  "2024-07-25",
  "2024-07-26",
  "2024-07-27",
  "2024-07-28",
  /*"2024-07-29",
  "2024-07-30",
  "2024-07-31",
  "2024-08-01",
  "2024-08-02",
  "2024-08-03",
  "2024-08-04",
  "2024-08-05",
  "2024-08-06",
  "2024-08-07",
  "2024-08-08",
  "2024-08-09",
  "2024-08-10",
  "2024-08-11",
  "2024-08-12",
  "2024-08-13",
  "2024-08-14",
  "2024-08-15",
  "2024-08-16",
  "2024-08-17",
  "2024-08-18",
  "2024-08-19",
  "2024-08-20",
  "2024-08-21",
  "2024-08-22",
  "2024-08-23",
  "2024-08-24",
  "2024-08-25",
  "2024-08-26",
  "2024-08-27",
  "2024-08-28",
  "2024-08-29",
  "2024-08-30",
  "2024-08-31",
  "2024-09-01",
  "2024-09-02",
  "2024-09-03",
  "2024-09-04",
  "2024-09-05",
  "2024-09-06",
  "2024-09-07",
  "2024-09-08",
  "2024-09-09",
  "2024-09-10",
  "2024-09-11",
  "2024-09-12",
  "2024-09-13",
  "2024-09-14",
  "2024-09-15",
  "2024-09-16",
  "2024-09-17",
  "2024-09-18",
  "2024-09-19",
  "2024-09-20",
  "2024-09-21",
  "2024-09-22",
  "2024-09-23",
  "2024-09-24",
  "2024-09-25",
  "2024-09-26",
  "2024-09-27",
  "2024-09-28",
  "2024-09-29",
  "2024-09-30",
  "2024-10-01",
  "2024-10-02",
  "2024-10-03",
  "2024-10-04",
  "2024-10-05",
  "2024-10-06",
  "2024-10-07",
  "2024-10-08",
  "2024-10-09",
  "2024-10-10",
  "2024-10-11",
  "2024-10-12",
  "2024-10-13",
  "2024-10-14",
  "2024-10-15",
  "2024-10-16",
  "2024-10-17",
  "2024-10-18",
  "2024-10-19",
  "2024-10-20",
  "2024-10-21",
  "2024-10-22",
  "2024-10-23",
  "2024-10-24",
  "2024-10-25",
  "2024-10-26",
  "2024-10-27",
  "2024-10-28",
  "2024-10-29",
  "2024-10-30",
  "2024-10-31",
  "2024-11-01",
  "2024-11-02",
  "2024-11-03",
  "2024-11-04",
  "2024-11-05",
  "2024-11-06",
  "2024-11-07",
  "2024-11-08",
  "2024-11-09",
  "2024-11-10",
  "2024-11-11",
  "2024-11-12",
  "2024-11-13",
  "2024-11-14",
  "2024-11-15",
  "2024-11-16",
  "2024-11-17",
  "2024-11-18",
  "2024-11-19",
  "2024-11-20",
  "2024-11-21",
  "2024-11-22",
  "2024-11-23",
  "2024-11-24",
  "2024-11-25",
  "2024-11-26",
  "2024-11-27",
  "2024-11-28",
  "2024-11-29",
  "2024-11-30",
  "2024-12-01",
  "2024-12-02",
  "2024-12-03",
  "2024-12-04",
  "2024-12-05",
  "2024-12-06",
  "2024-12-07",
  "2024-12-08",
  "2024-12-09",
  "2024-12-10",
  "2024-12-11",
  "2024-12-12",
  "2024-12-13",
  "2024-12-14",
  "2024-12-15",
  "2024-12-16",
  "2024-12-17",
  "2024-12-18",
  "2024-12-19",
  "2024-12-20",
  "2024-12-21",
  "2024-12-22",
  "2024-12-23",
  "2024-12-24",
  "2024-12-25",
  "2024-12-26",
  "2024-12-27",
  "2024-12-28",
  "2024-12-29",
  "2024-12-30",
  "2024-12-31",
  "2025-01-01",
  "2025-01-02",
  "2025-01-03",
  "2025-01-04",
  "2025-01-05",
  "2025-01-06",
  "2025-01-07",
  "2025-01-08",
  "2025-01-09",
  "2025-01-10",
  "2025-01-11",
  "2025-01-12",
  "2025-01-13",
  "2025-01-14",
  "2025-01-15",
  "2025-01-16",
  "2025-01-17",
  "2025-01-18",
  "2025-01-19",
  "2025-01-20",
  "2025-01-21",
  "2025-01-22",
  "2025-01-23",
  "2025-01-24",
  "2025-01-25",
  "2025-01-26",
  "2025-01-27",
  "2025-01-28",
  "2025-01-29",
  "2025-01-30",
  "2025-01-31",
  "2025-02-01",
  "2025-02-02",
  "2025-02-03",
  "2025-02-04",
  "2025-02-05",
  "2025-02-06",
  "2025-02-07",
  "2025-02-08",
  "2025-02-09",
  "2025-02-10",
  "2025-02-11",
  "2025-02-12",
  "2025-02-13",
  "2025-02-14",
  "2025-02-15",
  "2025-02-16",
  "2025-02-17",
  "2025-02-18",
  "2025-02-19",
  "2025-02-20",
  "2025-02-21",
  "2025-02-22",
  "2025-02-23",
  "2025-02-24",
  "2025-02-25",
  "2025-02-26",
  "2025-02-27",
  "2025-02-28",
  "2025-03-01",
  "2025-03-02",
  "2025-03-03",
  "2025-03-04",
  "2025-03-05",
  "2025-03-06",
  "2025-03-07",
  "2025-03-08",
  "2025-03-09",
  "2025-03-10",
  "2025-03-11",
  "2025-03-12",
  "2025-03-13",
  "2025-03-14",
  "2025-03-15",
  "2025-03-16",
  "2025-03-17",
  "2025-03-18",
  "2025-03-19",
  "2025-03-20",
  "2025-03-21",
  "2025-03-22",
  "2025-03-23",
  "2025-03-24",
  "2025-03-25",
  "2025-03-26",
  "2025-03-27",
  "2025-03-28",
  "2025-03-29",
  "2025-03-30",
  "2025-03-31",
  "2025-04-01",
  "2025-04-02",
  "2025-04-03",
  "2025-04-04",
  "2025-04-05",
  "2025-04-06",
  "2025-04-07",
  "2025-04-08",
  "2025-04-09",
  "2025-04-10",
  "2025-04-11",
  "2025-04-12",
  "2025-04-13",
  "2025-04-14",
  "2025-04-15",
  "2025-04-16",
  "2025-04-17",
  "2025-04-18",
  "2025-04-19",
  "2025-04-20",
  "2025-04-21",
  "2025-04-22",
  "2025-04-23",
  "2025-04-24",
  "2025-04-25",
  "2025-04-26",
  "2025-04-27",
  "2025-04-28",
  "2025-04-29",
  "2025-04-30",
  "2025-05-01",
  "2025-05-02",
  "2025-05-03",
  "2025-05-04",
  "2025-05-05",
  "2025-05-06",
  "2025-05-07",
  "2025-05-08",
  "2025-05-09",
  "2025-05-10",
  "2025-05-11",
  "2025-05-12",
  "2025-05-13",
  "2025-05-14",
  "2025-05-15",
  "2025-05-16",
  "2025-05-17",
  "2025-05-18",
  "2025-05-19",
  "2025-05-20",
  "2025-05-21",
  "2025-05-22",
  "2025-05-23",
  "2025-05-24",
  "2025-05-25",
  "2025-05-26",
  "2025-05-27",
  "2025-05-28",
  "2025-05-29",
  "2025-05-30",
  "2025-05-31",
  "2025-06-01",
  "2025-06-02",
  "2025-06-03",
  "2025-06-04",
  "2025-06-05",
  "2025-06-06",
  "2025-06-07",
  "2025-06-08",
  "2025-06-09",
  "2025-06-10",
  "2025-06-11",
  "2025-06-12",
  "2025-06-13",
  "2025-06-14",
  "2025-06-15",
  "2025-06-16",
  "2025-06-17",
  "2025-06-18",
  "2025-06-19",
  "2025-06-20",
  "2025-06-21",
  "2025-06-22",
  "2025-06-23",
  "2025-06-24",
  "2025-06-25",
  "2025-06-26",
  "2025-06-27",
  "2025-06-28",
  "2025-06-29",
  "2025-06-30",
  "2025-07-01",
  "2025-07-02",
  "2025-07-03",
  "2025-07-04",
  "2025-07-05",
  "2025-07-06",
  "2025-07-07",
  "2025-07-08",
  "2025-07-09",
  "2025-07-10",
  "2025-07-11",
  "2025-07-12",
  "2025-07-13",
  "2025-07-14",
  "2025-07-15",
  "2025-07-16",
  "2025-07-17",
  "2025-07-18",
  "2025-07-19",
  "2025-07-20",
  "2025-07-21",
  "2025-07-22",
  "2025-07-23",
  "2025-07-24",
  "2025-07-25",
  "2025-07-26",
  "2025-07-27",
  "2025-07-28",
  "2025-07-29",
  "2025-07-30",
  "2025-07-31",
  "2025-08-01",
  "2025-08-02",
  "2025-08-03",
  "2025-08-04",
  "2025-08-05",
  "2025-08-06",
  "2025-08-07",
  "2025-08-08",
  "2025-08-09",
  "2025-08-10",
  "2025-08-11",
  "2025-08-12",
  "2025-08-13",
  "2025-08-14",
  "2025-08-15",
  "2025-08-16",
  "2025-08-17",
  "2025-08-18",
  "2025-08-19",
  "2025-08-20",
  "2025-08-21",
  "2025-08-22",
  "2025-08-23",
  "2025-08-24",
  "2025-08-25",
  "2025-08-26",
  "2025-08-27",
  "2025-08-28",
  "2025-08-29",
  "2025-08-30",
  "2025-08-31",
  "2025-09-01",
  "2025-09-02",
  "2025-09-03",
  "2025-09-04",
  "2025-09-05",
  "2025-09-06",
  "2025-09-07",
  "2025-09-08",
  "2025-09-09",
  "2025-09-10",
  "2025-09-11",
  "2025-09-12",
  "2025-09-13",
  "2025-09-14",
  "2025-09-15",
  "2025-09-16",
  "2025-09-17",
  "2025-09-18",
  "2025-09-19",
  "2025-09-20",
  "2025-09-21",
  "2025-09-22",
  "2025-09-23",
  "2025-09-24",
  "2025-09-25",
  "2025-09-26",
  "2025-09-27",
  "2025-09-28",
  "2025-09-29",
  "2025-09-30",
  "2025-10-01",
  "2025-10-02",
  "2025-10-03",
  "2025-10-04",
  "2025-10-05",
  "2025-10-06",
  "2025-10-07",
  "2025-10-08",
  "2025-10-09",
  "2025-10-10",
  "2025-10-11",
  "2025-10-12",
  "2025-10-13",
  "2025-10-14",
  "2025-10-15",
  "2025-10-16",
  "2025-10-17",
  "2025-10-18",
  "2025-10-19",
  "2025-10-20",
  "2025-10-21",
  "2025-10-22",
  "2025-10-23",
  "2025-10-24",
  "2025-10-25",
  "2025-10-26",
  "2025-10-27",
  "2025-10-28",
  "2025-10-29",
  "2025-10-30",
  "2025-10-31",
  "2025-11-01",
  "2025-11-02",
  "2025-11-03",
  "2025-11-04",
  "2025-11-05",
  "2025-11-06",
  "2025-11-07",
  "2025-11-08",
  "2025-11-09",
  "2025-11-10",
  "2025-11-11",
  "2025-11-12",
  "2025-11-13",
  "2025-11-14",
  "2025-11-15",
  "2025-11-16",
  "2025-11-17",
  "2025-11-18",
  "2025-11-19",
  "2025-11-20",
  "2025-11-21",
  "2025-11-22",
  "2025-11-23",
  "2025-11-24",
  "2025-11-25",
  "2025-11-26",
  "2025-11-27",
  "2025-11-28",
  "2025-11-29",
  "2025-11-30",
  "2025-12-01",
  "2025-12-02",
  "2025-12-03",
  "2025-12-04",
  "2025-12-05",
  "2025-12-06",
  "2025-12-07",
  "2025-12-08",
  "2025-12-09",
  "2025-12-10",
  "2025-12-11",
  "2025-12-12",
  "2025-12-13",
  "2025-12-14",
  "2025-12-15",
  "2025-12-16",
  "2025-12-17",
  "2025-12-18",
  "2025-12-19",
  "2025-12-20",
  "2025-12-21",
  "2025-12-22",
  "2025-12-23",
  "2025-12-24",
  "2025-12-25",
  "2025-12-26",
  "2025-12-27",
  "2025-12-28",
  "2025-12-29",
  "2025-12-30",
  "2025-12-31",
  "2026-01-01",
  "2026-01-02",
  "2026-01-03",
  "2026-01-04",
  "2026-01-05",
  "2026-01-06",
  "2026-01-07",
  "2026-01-08",
  "2026-01-09",
  "2026-01-10",
  "2026-01-11",
  "2026-01-12",
  "2026-01-13",
  "2026-01-14",
  "2026-01-15",
  "2026-01-16",
  "2026-01-17",
  "2026-01-18",
  "2026-01-19",
  "2026-01-20",
  "2026-01-21",
  "2026-01-22",
  "2026-01-23",
  "2026-01-24",
  "2026-01-25",
  "2026-01-26",
  "2026-01-27",
  "2026-01-28",
  "2026-01-29",
  "2026-01-30",
  "2026-01-31",
  "2026-02-01",
  "2026-02-02",
  "2026-02-03",
  "2026-02-04",
  "2026-02-05",
  "2026-02-06",
  "2026-02-07",
  "2026-02-08",
  "2026-02-09",
  "2026-02-10",
  "2026-02-11",
  "2026-02-12",
  "2026-02-13",
  "2026-02-14",
  "2026-02-15",
  "2026-02-16",
  "2026-02-17",
  "2026-02-18",
  "2026-02-19",
  "2026-02-20",
  "2026-02-21",
  "2026-02-22",
  "2026-02-23",
  "2026-02-24",
  "2026-02-25",
  "2026-02-26",
  "2026-02-27",
  "2026-02-28",
  "2026-03-01",
  "2026-03-02",
  "2026-03-03",
  "2026-03-04",
  "2026-03-05",
  "2026-03-06",
  "2026-03-07",
  "2026-03-08",
  "2026-03-09",
  "2026-03-10",
  "2026-03-11",
  "2026-03-12",
  "2026-03-13",
  "2026-03-14",
  "2026-03-15",
  "2026-03-16",
  "2026-03-17",
  "2026-03-18",
  "2026-03-19",
  "2026-03-20",
  "2026-03-21",
  "2026-03-22",
  "2026-03-23",
  "2026-03-24",
  "2026-03-25",
  "2026-03-26",
  "2026-03-27",
  "2026-03-28",
  "2026-03-29",
  "2026-03-30",
  "2026-03-31",
  "2026-04-01",
  "2026-04-02",
  "2026-04-03",
  "2026-04-04",
  "2026-04-05",
  "2026-04-06",
  "2026-04-07",
  "2026-04-08",
  "2026-04-09",
  "2026-04-10",
  "2026-04-11",
  "2026-04-12",
  "2026-04-13",
  "2026-04-14",
  "2026-04-15",
  "2026-04-16",
  "2026-04-17",
  "2026-04-18",
  "2026-04-19",
  "2026-04-20",
  "2026-04-21",
  "2026-04-22",
  "2026-04-23",
  "2026-04-24",
  "2026-04-25",
  "2026-04-26",
  "2026-04-27",
  "2026-04-28",
  "2026-04-29",
  "2026-04-30",
  "2026-05-01",
  "2026-05-02",
  "2026-05-03",
  "2026-05-04",
  "2026-05-05",
  "2026-05-06",
  "2026-05-07",
  "2026-05-08",
  "2026-05-09",
  "2026-05-10",
  "2026-05-11",
  "2026-05-12",
  "2026-05-13",
  "2026-05-14",
  "2026-05-15",
  "2026-05-16",
  "2026-05-17",
  "2026-05-18",
  "2026-05-19",
  "2026-05-20",
  "2026-05-21",
  "2026-05-22",
  "2026-05-23",
  "2026-05-24",
  "2026-05-25",
  "2026-05-26",
  "2026-05-27",
  "2026-05-28",
  "2026-05-29",
  "2026-05-30",
  "2026-05-31",
  "2026-06-01",
  "2026-06-02",
  "2026-06-03",
  "2026-06-04",
  "2026-06-05",
  "2026-06-06",
  "2026-06-07",
  "2026-06-08",
  "2026-06-09",
  "2026-06-10",
  "2026-06-11",
  "2026-06-12",
  "2026-06-13",
  "2026-06-14",
  "2026-06-15",
  "2026-06-16",
  "2026-06-17",
  "2026-06-18",
  "2026-06-19",
  "2026-06-20",
  "2026-06-21",
  "2026-06-22",
  "2026-06-23",
  "2026-06-24",
  "2026-06-25",
  "2026-06-26",
  "2026-06-27",
  "2026-06-28",
  "2026-06-29",
  "2026-06-30",
  "2026-07-01",
  "2026-07-02",
  "2026-07-03",
  "2026-07-04",
  "2026-07-05",
  "2026-07-06",
  "2026-07-07",
  "2026-07-08",
  "2026-07-09",
  "2026-07-10",
  "2026-07-11",
  "2026-07-12",
  "2026-07-13",
  "2026-07-14",
  "2026-07-15",
  "2026-07-16",
  "2026-07-17",
  "2026-07-18",
  "2026-07-19",
  "2026-07-20",
  "2026-07-21",
  "2026-07-22",
  "2026-07-23",
  "2026-07-24",
  "2026-07-25",
  "2026-07-26",
  "2026-07-27",
  "2026-07-28",
  "2026-07-29",
  "2026-07-30",
  "2026-07-31",
  "2026-08-01",
  "2026-08-02",
  "2026-08-03",
  "2026-08-04",
  "2026-08-05",
  "2026-08-06",
  "2026-08-07",
  "2026-08-08",
  "2026-08-09",
  "2026-08-10",
  "2026-08-11",
  "2026-08-12",
  "2026-08-13",
  "2026-08-14",
  "2026-08-15",
  "2026-08-16",
  "2026-08-17",
  "2026-08-18",
  "2026-08-19",
  "2026-08-20",
  "2026-08-21",
  "2026-08-22",
  "2026-08-23",
  "2026-08-24",
  "2026-08-25",
  "2026-08-26",
  "2026-08-27",
  "2026-08-28",
  "2026-08-29",
  "2026-08-30",
  "2026-08-31",
  "2026-09-01",
  "2026-09-02",
  "2026-09-03",
  "2026-09-04",
  "2026-09-05",
  "2026-09-06",
  "2026-09-07",
  "2026-09-08",
  "2026-09-09",
  "2026-09-10",
  "2026-09-11",
  "2026-09-12",
  "2026-09-13",
  "2026-09-14",
  "2026-09-15",
  "2026-09-16",
  "2026-09-17",
  "2026-09-18",
  "2026-09-19",
  "2026-09-20",
  "2026-09-21",
  "2026-09-22",
  "2026-09-23",
  "2026-09-24",
  "2026-09-25",
  "2026-09-26",
  "2026-09-27",
  "2026-09-28",
  "2026-09-29",
  "2026-09-30",
  "2026-10-01",
  "2026-10-02",
  "2026-10-03",
  "2026-10-04",
  "2026-10-05",
  "2026-10-06",
  "2026-10-07",
  "2026-10-08",
  "2026-10-09",
  "2026-10-10",
  "2026-10-11",
  "2026-10-12",
  "2026-10-13",
  "2026-10-14",
  "2026-10-15",
  "2026-10-16",
  "2026-10-17",
  "2026-10-18",
  "2026-10-19",
  "2026-10-20",
  "2026-10-21",
  "2026-10-22",
  "2026-10-23",
  "2026-10-24",
  "2026-10-25",
  "2026-10-26",
  "2026-10-27",
  "2026-10-28",
  "2026-10-29",
  "2026-10-30",
  "2026-10-31",
  "2026-11-01",
  "2026-11-02",
  "2026-11-03",
  "2026-11-04",
  "2026-11-05",
  "2026-11-06",
  "2026-11-07",
  "2026-11-08",
  "2026-11-09",
  "2026-11-10",
  "2026-11-11",
  "2026-11-12",
  "2026-11-13",
  "2026-11-14",
  "2026-11-15",
  "2026-11-16",
  "2026-11-17",
  "2026-11-18",
  "2026-11-19",
  "2026-11-20",
  "2026-11-21",
  "2026-11-22",
  "2026-11-23",
  "2026-11-24",
  "2026-11-25",
  "2026-11-26",
  "2026-11-27",
  "2026-11-28",
  "2026-11-29",
  "2026-11-30",
  "2026-12-01",
  "2026-12-02",
  "2026-12-03",
  "2026-12-04",
  "2026-12-05",
  "2026-12-06",
  "2026-12-07",
  "2026-12-08",
  "2026-12-09",
  "2026-12-10",
  "2026-12-11",
  "2026-12-12",
  "2026-12-13",
  "2026-12-14",
  "2026-12-15",
  "2026-12-16",
  "2026-12-17",
  "2026-12-18",
  "2026-12-19",
  "2026-12-20",
  "2026-12-21",
  "2026-12-22",
  "2026-12-23",
  "2026-12-24",
  "2026-12-25",
  "2026-12-26",
  "2026-12-27",
  "2026-12-28",
  "2026-12-29",
  "2026-12-30",
  "2026-12-31",
  "2027-01-01",
  "2027-01-02",
  "2027-01-03",
  "2027-01-04",
  "2027-01-05",
  "2027-01-06",
  "2027-01-07",
  "2027-01-08",
  "2027-01-09",
  "2027-01-10",
  "2027-01-11",
  "2027-01-12",
  "2027-01-13",
  "2027-01-14",
  "2027-01-15",
  "2027-01-16",
  "2027-01-17",
  "2027-01-18",
  "2027-01-19",
  "2027-01-20",
  "2027-01-21",
  "2027-01-22",
  "2027-01-23",
  "2027-01-24",
  "2027-01-25",
  "2027-01-26",
  "2027-01-27",
  "2027-01-28",
  "2027-01-29",
  "2027-01-30",
  "2027-01-31",
  "2027-02-01",
  "2027-02-02",
  "2027-02-03",
  "2027-02-04",
  "2027-02-05",
  "2027-02-06",
  "2027-02-07",
  "2027-02-08",
  "2027-02-09",
  "2027-02-10",
  "2027-02-11",
  "2027-02-12",
  "2027-02-13",
  "2027-02-14",
  "2027-02-15",
  "2027-02-16",
  "2027-02-17",
  "2027-02-18",
  "2027-02-19",
  "2027-02-20",
  "2027-02-21",
  "2027-02-22",
  "2027-02-23",
  "2027-02-24",
  "2027-02-25",
  "2027-02-26",
  "2027-02-27",
  "2027-02-28",
  "2027-03-01",
  "2027-03-02",
  "2027-03-03",
  "2027-03-04",
  "2027-03-05",
  "2027-03-06",
  "2027-03-07",
  "2027-03-08",
  "2027-03-09",
  "2027-03-10",
  "2027-03-11",
  "2027-03-12",
  "2027-03-13",
  "2027-03-14",
  "2027-03-15",
  "2027-03-16",
  "2027-03-17",
  "2027-03-18",
  "2027-03-19",
  "2027-03-20",
  "2027-03-21",
  "2027-03-22",
  "2027-03-23",
  "2027-03-24",
  "2027-03-25",
  "2027-03-26",
  "2027-03-27",
  "2027-03-28",
  "2027-03-29",
  "2027-03-30",
  "2027-03-31",
  "2027-04-01",
  "2027-04-02",
  "2027-04-03",
  "2027-04-04",
  "2027-04-05",
  "2027-04-06",
  "2027-04-07",
  "2027-04-08",
  "2027-04-09",
  "2027-04-10",
  "2027-04-11",
  "2027-04-12",
  "2027-04-13",
  "2027-04-14",
  "2027-04-15",
  "2027-04-16",
  "2027-04-17",
  "2027-04-18",
  "2027-04-19",
  "2027-04-20",
  "2027-04-21",
  "2027-04-22",
  "2027-04-23",
  "2027-04-24",
  "2027-04-25",
  "2027-04-26",
  "2027-04-27",
  "2027-04-28",
  "2027-04-29",
  "2027-04-30",
  "2027-05-01",
  "2027-05-02",
  "2027-05-03",
  "2027-05-04",
  "2027-05-05",
  "2027-05-06",
  "2027-05-07",
  "2027-05-08",
  "2027-05-09",
  "2027-05-10",
  "2027-05-11",
  "2027-05-12",
  "2027-05-13",
  "2027-05-14",
  "2027-05-15",
  "2027-05-16",
  "2027-05-17",
  "2027-05-18",
  "2027-05-19",
  "2027-05-20",
  "2027-05-21",
  "2027-05-22",
  "2027-05-23",
  "2027-05-24",
  "2027-05-25",
  "2027-05-26",
  "2027-05-27",
  "2027-05-28",
  "2027-05-29",
  "2027-05-30",
  "2027-05-31",
  "2027-06-01",
  "2027-06-02",
  "2027-06-03",
  "2027-06-04",
  "2027-06-05",
  "2027-06-06",
  "2027-06-07",
  "2027-06-08",
  "2027-06-09",
  "2027-06-10",
  "2027-06-11",
  "2027-06-12",
  "2027-06-13",
  "2027-06-14",
  "2027-06-15",
  "2027-06-16",
  "2027-06-17",
  "2027-06-18",
  "2027-06-19",
  "2027-06-20",
  "2027-06-21",
  "2027-06-22",
  "2027-06-23",
  "2027-06-24",
  "2027-06-25",
  "2027-06-26",
  "2027-06-27",
  "2027-06-28",
  "2027-06-29",
  "2027-06-30",
  "2027-07-01",
  "2027-07-02",
  "2027-07-03",
  "2027-07-04",
  "2027-07-05",
  "2027-07-06",
  "2027-07-07",
  "2027-07-08",
  "2027-07-09",
  "2027-07-10",
  "2027-07-11",
  "2027-07-12",
  "2027-07-13",
  "2027-07-14",
  "2027-07-15",
  "2027-07-16",
  "2027-07-17",
  "2027-07-18",
  "2027-07-19",
  "2027-07-20",
  "2027-07-21",
  "2027-07-22",
  "2027-07-23",
  "2027-07-24",
  "2027-07-25",
  "2027-07-26",
  "2027-07-27",
  "2027-07-28",
  "2027-07-29",
  "2027-07-30",
  "2027-07-31",
  "2027-08-01",
  "2027-08-02",
  "2027-08-03",
  "2027-08-04",
  "2027-08-05",
  "2027-08-06",
  "2027-08-07",
  "2027-08-08",
  "2027-08-09",
  "2027-08-10",
  "2027-08-11",
  "2027-08-12",
  "2027-08-13",
  "2027-08-14",
  "2027-08-15",
  "2027-08-16",
  "2027-08-17",
  "2027-08-18",
  "2027-08-19",
  "2027-08-20",
  "2027-08-21",
  "2027-08-22",
  "2027-08-23",
  "2027-08-24",
  "2027-08-25",
  "2027-08-26",
  "2027-08-27",
  "2027-08-28",
  "2027-08-29",
  "2027-08-30",
  "2027-08-31",
  "2027-09-01",
  "2027-09-02",
  "2027-09-03",
  "2027-09-04",
  "2027-09-05",
  "2027-09-06",
  "2027-09-07",
  "2027-09-08",
  "2027-09-09",
  "2027-09-10",
  "2027-09-11",
  "2027-09-12",
  "2027-09-13",
  "2027-09-14",
  "2027-09-15",
  "2027-09-16",
  "2027-09-17",
  "2027-09-18",
  "2027-09-19",
  "2027-09-20",
  "2027-09-21",
  "2027-09-22",
  "2027-09-23",
  "2027-09-24",
  "2027-09-25",
  "2027-09-26",
  "2027-09-27",
  "2027-09-28",
  "2027-09-29",
  "2027-09-30",
  "2027-10-01",
  "2027-10-02",
  "2027-10-03",
  "2027-10-04",
  "2027-10-05",
  "2027-10-06",
  "2027-10-07",
  "2027-10-08",
  "2027-10-09",
  "2027-10-10",
  "2027-10-11",
  "2027-10-12",
  "2027-10-13",
  "2027-10-14",
  "2027-10-15",
  "2027-10-16",
  "2027-10-17",
  "2027-10-18",
  "2027-10-19",
  "2027-10-20",
  "2027-10-21",
  "2027-10-22",
  "2027-10-23",
  "2027-10-24",
  "2027-10-25",
  "2027-10-26",
  "2027-10-27",
  "2027-10-28",
  "2027-10-29",
  "2027-10-30",
  "2027-10-31",
  "2027-11-01",
  "2027-11-02",
  "2027-11-03",
  "2027-11-04",
  "2027-11-05",
  "2027-11-06",
  "2027-11-07",
  "2027-11-08",
  "2027-11-09",
  "2027-11-10",
  "2027-11-11",
  "2027-11-12",
  "2027-11-13",
  "2027-11-14",
  "2027-11-15",
  "2027-11-16",
  "2027-11-17",
  "2027-11-18",
  "2027-11-19",
  "2027-11-20",
  "2027-11-21",
  "2027-11-22",
  "2027-11-23",
  "2027-11-24",
  "2027-11-25",
  "2027-11-26",
  "2027-11-27",
  "2027-11-28",
  "2027-11-29",
  "2027-11-30",
  "2027-12-01",
  "2027-12-02",
  "2027-12-03",
  "2027-12-04",
  "2027-12-05",
  "2027-12-06",
  "2027-12-07",
  "2027-12-08",
  "2027-12-09",
  "2027-12-10",
  "2027-12-11",
  "2027-12-12",
  "2027-12-13",
  "2027-12-14",
  "2027-12-15",
  "2027-12-16",
  "2027-12-17",
  "2027-12-18",
  "2027-12-19",
  "2027-12-20",
  "2027-12-21",
  "2027-12-22",
  "2027-12-23",
  "2027-12-24",
  "2027-12-25",
  "2027-12-26",
  "2027-12-27",
  "2027-12-28",
  "2027-12-29",
  "2027-12-30",
  "2027-12-31",
  "2028-01-01",
  "2028-01-02",
  "2028-01-03",
  "2028-01-04",
  "2028-01-05",
  "2028-01-06",
  "2028-01-07",
  "2028-01-08",
  "2028-01-09",
  "2028-01-10",
  "2028-01-11",
  "2028-01-12",
  "2028-01-13",
  "2028-01-14",
  "2028-01-15",
  "2028-01-16",
  "2028-01-17",
  "2028-01-18",
  "2028-01-19",
  "2028-01-20",
  "2028-01-21",
  "2028-01-22",
  "2028-01-23",
  "2028-01-24",
  "2028-01-25",
  "2028-01-26",
  "2028-01-27",
  "2028-01-28",
  "2028-01-29",
  "2028-01-30",
  "2028-01-31",
  "2028-02-01",
  "2028-02-02",
  "2028-02-03",
  "2028-02-04",
  "2028-02-05",
  "2028-02-06",
  "2028-02-07",
  "2028-02-08",
  "2028-02-09",
  "2028-02-10",
  "2028-02-11",
  "2028-02-12",
  "2028-02-13",
  "2028-02-14",
  "2028-02-15",
  "2028-02-16",
  "2028-02-17",
  "2028-02-18",
  "2028-02-19",
  "2028-02-20",
  "2028-02-21",
  "2028-02-22",
  "2028-02-23",
  "2028-02-24",
  "2028-02-25",
  "2028-02-26",
  "2028-02-27",
  "2028-02-28",
  "2028-02-29",
  "2028-03-01",
  "2028-03-02",
  "2028-03-03",
  "2028-03-04",
  "2028-03-05",
  "2028-03-06",
  "2028-03-07",
  "2028-03-08",
  "2028-03-09",
  "2028-03-10",
  "2028-03-11",
  "2028-03-12",
  "2028-03-13",
  "2028-03-14",
  "2028-03-15",
  "2028-03-16",
  "2028-03-17",
  "2028-03-18",
  "2028-03-19",
  "2028-03-20",
  "2028-03-21",
  "2028-03-22",
  "2028-03-23",
  "2028-03-24",
  "2028-03-25",
  "2028-03-26",
  "2028-03-27",
  "2028-03-28",
  "2028-03-29",
  "2028-03-30",
  "2028-03-31",
  "2028-04-01",
  "2028-04-02",
  "2028-04-03",
  "2028-04-04",
  "2028-04-05",
  "2028-04-06",
  "2028-04-07",
  "2028-04-08",
  "2028-04-09",
  "2028-04-10",
  "2028-04-11",
  "2028-04-12",
  "2028-04-13",
  "2028-04-14",
  "2028-04-15",
  "2028-04-16",
  "2028-04-17",
  "2028-04-18",
  "2028-04-19",
  "2028-04-20",
  "2028-04-21",
  "2028-04-22",
  "2028-04-23",
  "2028-04-24",
  "2028-04-25",
  "2028-04-26",
  "2028-04-27",
  "2028-04-28",
  "2028-04-29",
  "2028-04-30",
  "2028-05-01",
  "2028-05-02",
  "2028-05-03",
  "2028-05-04",
  "2028-05-05",
  "2028-05-06",
  "2028-05-07",
  "2028-05-08",
  "2028-05-09",
  "2028-05-10",
  "2028-05-11",
  "2028-05-12",
  "2028-05-13",
  "2028-05-14",
  "2028-05-15",
  "2028-05-16",
  "2028-05-17",
  "2028-05-18",
  "2028-05-19",
  "2028-05-20",
  "2028-05-21",
  "2028-05-22",
  "2028-05-23",
  "2028-05-24",
  "2028-05-25",
  "2028-05-26",
  "2028-05-27",
  "2028-05-28",
  "2028-05-29",
  "2028-05-30",
  "2028-05-31",
  "2028-06-01",
  "2028-06-02",
  "2028-06-03",
  "2028-06-04",
  "2028-06-05",
  "2028-06-06",
  "2028-06-07",
  "2028-06-08",
  "2028-06-09",
  "2028-06-10",
  "2028-06-11",
  "2028-06-12",
  "2028-06-13",
  "2028-06-14",
  "2028-06-15",
  "2028-06-16",
  "2028-06-17",
  "2028-06-18",
  "2028-06-19",
  "2028-06-20",
  "2028-06-21",
  "2028-06-22",
  "2028-06-23",
  "2028-06-24",
  "2028-06-25",
  "2028-06-26",
  "2028-06-27",
  "2028-06-28",
  "2028-06-29",
  "2028-06-30",
  "2028-07-01",
  "2028-07-02",
  "2028-07-03",
  "2028-07-04",
  "2028-07-05",
  "2028-07-06",
  "2028-07-07",
  "2028-07-08",
  "2028-07-09",
  "2028-07-10",
  "2028-07-11",
  "2028-07-12",
  "2028-07-13",
  "2028-07-14",
  "2028-07-15",
  "2028-07-16",
  "2028-07-17",
  "2028-07-18",
  "2028-07-19",
  "2028-07-20",
  "2028-07-21",
  "2028-07-22",
  "2028-07-23",
  "2028-07-24",
  "2028-07-25",
  "2028-07-26",
  "2028-07-27",
  "2028-07-28",
  "2028-07-29",
  "2028-07-30",
  "2028-07-31",
  "2028-08-01",
  "2028-08-02",
  "2028-08-03",
  "2028-08-04",
  "2028-08-05",
  "2028-08-06",
  "2028-08-07",
  "2028-08-08",
  "2028-08-09",
  "2028-08-10",
  "2028-08-11",
  "2028-08-12",
  "2028-08-13",
  "2028-08-14",
  "2028-08-15",
  "2028-08-16",
  "2028-08-17",
  "2028-08-18",
  "2028-08-19",
  "2028-08-20",
  "2028-08-21",
  "2028-08-22",
  "2028-08-23",
  "2028-08-24",
  "2028-08-25",
  "2028-08-26",
  "2028-08-27",
  "2028-08-28",
  "2028-08-29",
  "2028-08-30",
  "2028-08-31",*/
].map((s) => s.replaceAll("-", "_"));

/*
const arr = []
for (let i=0; i < 1500; i++) {
    let date = new Date()
    date = new Date(date.setDate(date.getDate() + i))
    stringDate = date.toISOString().split('T')[0]
    arr.push(stringDate)
}
console.info(arr)

*/
