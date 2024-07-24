"use client";
import { Card, getDeck, Hand, rankPokerHand } from "@/utils/scorePokerHand";
import { useEffect, useReducer } from "react";
import { produce } from "immer";
import { resetJSON, submitScore } from "@/app/actions";
import { Scores } from "@/components/scores";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type GameState = {
  deck: Card[] | null;
  activeCard: Card;
  hands: [Hand, Hand, Hand, Hand, Hand];
  score: number | null;
  round: number;
};

type Action =
  | {
      type: "SELECT_STACK";
      payload: number;
    }
  | {
      type: "INIT";
    };

function reducer(state: GameState, action: Action): GameState {
  return produce(state, (draftState) => {
    switch (action.type) {
      case "INIT": {
        return state;
      }
      case "SELECT_STACK": {
        const newCard = draftState.deck?.pop()!;
        draftState.hands[action.payload].push(draftState.activeCard);
        draftState.activeCard = newCard;
        if (draftState.hands.every((h) => h.length === state.round + 1)) {
          draftState.round++;
        }

        if (draftState.hands.every((h) => h.length === 5)) {
          draftState.score = draftState.hands.reduce((sum, hand) => {
            return sum + rankPokerHand(hand);
          }, 0);

          return draftState;
        }
      }
    }
  });
}

const prettifyCard = (c: Card): string => {
  return `${c.Suit}${c.Value}`;
};

const dateStr = new Date().toISOString().split("T")[0].replaceAll("-", "_");

const queryClient = new QueryClient({});

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Home />
    </QueryClientProvider>
  );
}

function Home() {
  const [state, dispatch] = useReducer(
    reducer,
    { deck: null, activeCard: null, hands: null, score: null, round: 0 },
    () => {
      const deck = getDeck();
      const one = deck.pop()!;
      const two = deck.pop()!;
      const three = deck.pop()!;
      const four = deck.pop()!;
      const five = deck.pop()!;
      const activeCard = deck.pop()!;
      return {
        deck: deck,
        activeCard: activeCard,
        hands: [
          [one],
          [two],
          [three],
          [four],
          [five],
        ] satisfies GameState["hands"],
        score: null,
        round: 1,
      };
    }
  );

  const queryClient = useQueryClient();
  const submitScoreMutation = useMutation({
    mutationKey: [dateStr, "update_score"],
    mutationFn: (score: number) => {
      return submitScore(dateStr, score);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [dateStr], exact: true });
    },
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <button
        onClick={() => {
          submitScoreMutation.mutate(2);
        }}
      >
        submit
      </button>
      <button
        onClick={() => {
          resetJSON();
        }}
      >
        reset
      </button>
      {/*<Scores dateStr={dateStr} />*/}

      <div className="flex gap-2">
        {state.hands?.map((stack, idx) => {
          return (
            <Stack
              key={idx}
              onClick={() => {
                if (
                  state.round === state.hands[idx].length &&
                  state.hands[idx].length <= 4
                ) {
                  dispatch({ type: "SELECT_STACK", payload: idx });
                }
              }}
            >
              {stack.map((c) => {
                const key = prettifyCard(c);
                return <div key={key}>{key}</div>;
              })}
            </Stack>
          );
        })}
      </div>

      <div>{prettifyCard(state.activeCard)}</div>
      <div>{state.score}</div>
    </main>
  );
}

const Stack = ({
  children,
  onClick,
}: React.PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <div
      onClick={onClick}
      className="border-2 border-black border-solid min-h-[20px] w-16 flex justify-start text-center items-center flex-col"
    >
      {children}
    </div>
  );
};
