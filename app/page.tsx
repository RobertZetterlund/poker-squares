"use client";
import { Card, getDeck, Hand, rankPokerHand } from "@/utils/scorePokerHand";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { produce } from "immer";
import { submitScore } from "@/app/actions";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PlayingCard } from "@/components/Card";
import { StampButton } from "@/components/StampButton";
import { Scores } from "@/components/Scores";
import { Rules } from "@/components/Rules";
import Link from "next/link";
import Image from "next/image";

const dateStr = new Date().toISOString().split("T")[0].replaceAll("-", "_");

type GameState = {
  deck: Card[] | null;
  activeCard: Card;
  hands: Hand[];
  score: number | null;
  round: number;
  isFreePlay: boolean;
};

type Action =
  | {
      type: "SELECT_STACK";
      payload: number;
    }
  | {
      type: "INIT";
    }
  | {
      type: "FREE_PLAY";
    };

function reducer(state: GameState, action: Action): GameState {
  return produce(state, (draftState) => {
    switch (action.type) {
      case "INIT": {
        const stringState = localStorage.getItem(dateStr);
        if (stringState) {
          return JSON.parse(stringState);
        }
        return getInitialState(dateStr);
      }
      case "FREE_PLAY": {
        draftState = getInitialState(
          String(Math.floor(Math.random() * 10000000000000))
        );
        draftState.isFreePlay = true;
        return draftState;
      }
      case "SELECT_STACK": {
        if (state.score != null) {
          return state;
        }
        if (state.round < state.hands[action.payload].length) {
          return state;
        }

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

const getInitialState = (dateStr: string): GameState => {
  const deck = getDeck(dateStr);
  const one = deck.pop()!;
  const two = deck.pop()!;
  const three = deck.pop()!;
  const four = deck.pop()!;
  const five = deck.pop()!;
  const activeCard = deck.pop()!;
  return {
    deck: deck,
    activeCard: activeCard,
    hands: [[one], [two], [three], [four], [five]] satisfies GameState["hands"],
    score: null,
    round: 1,
    isFreePlay: false,
  };
};

const keyifyCard = (c: Card): string => {
  return `${c.Suit}${c.Value}`;
};

const queryClient = new QueryClient({});

export default function Page() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

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
    localStorage.getItem(dateStr),
    (stringifiedLocalState) => {
      if (stringifiedLocalState) {
        return JSON.parse(stringifiedLocalState);
      }
      return getInitialState(dateStr);
    }
  );

  useEffect(() => {
    if (!state.isFreePlay && dateStr) {
      localStorage.setItem(dateStr, JSON.stringify(state));
    }
  }, [state]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [dateStr, "update_score"],
    mutationFn: ({
      score,
      isFreePlay,
    }: {
      score: number;
      isFreePlay: boolean;
    }) => {
      return submitScore({
        score,
        date: isFreePlay ? undefined : dateStr,
      });
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [dateStr], exact: true });
    },
  });

  useEffect(() => {
    // whenever we get a score and its not already sent from this browser, send it
    if (state.score == null) {
      return;
    }
    if (state.isFreePlay) {
      mutate({ isFreePlay: state.isFreePlay, score: state.score });
    } else if (!state.isFreePlay) {
      const maybeDailyScore = localStorage.getItem(dateStr + "-score");
      if (maybeDailyScore == undefined) {
        localStorage.setItem(dateStr + "-score", String(state.score));
        mutate({ isFreePlay: state.isFreePlay, score: state.score });
      }
    }

    // we don't care about the mutation updating
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.score, state.isFreePlay]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5"
      ) {
        dispatch({ type: "SELECT_STACK", payload: Number(e.key) - 1 });
      }
    };
    document.addEventListener("keypress", listener);
    return () => {
      document.removeEventListener("keypress", listener);
    };
  }, []);

  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const onOpenRulesModal = useCallback(() => setRulesModalOpen(true), []);
  const onCloseRulesModal = useCallback(() => setRulesModalOpen(false), []);

  const [scoresModalOpen, setScoresModalOpen] = useState(false);
  const onOpenScoresModal = useCallback(() => setScoresModalOpen(true), []);
  const onCloseScoresModal = useCallback(() => setScoresModalOpen(false), []);

  // The modal were scrolling to the bottom, but lets make sure
  // its focuses the top of the modal meaning it is always opened
  // focused at a top element (having it in view).
  const focusRefHack = useRef(null);

  return (
    <>
      <div className="min-h-screen flex flex-col gap-8">
        <header className="w-full p-2">
          <div className="max-w-[1080px] flex justify-between mx-auto">
            <button
              onClick={() => {
                dispatch({ type: "INIT" });
              }}
            >
              Poker Squares
            </button>

            <button onClick={onOpenRulesModal}>?</button>
          </div>
        </header>
        <main className="flex justify-center flex-col items-center">
          <div className="text-white mb-4 grid grid-cols-3 w-full place-items-center px-1">
            <span className="text-sm mr-auto">
              {state.isFreePlay ? (
                <StampButton
                  text="< Daily"
                  onClick={() => {
                    dispatch({ type: "INIT" });
                  }}
                />
              ) : (
                dateStr
              )}
            </span>
            <h1 className="text-xl underline w-max">
              {state.isFreePlay ? "Free-Play" : "Todays Deck"}
            </h1>
            <div className="ml-auto text-sm">
              <StampButton
                disabled={state.score == null}
                text="Free-play"
                onClick={() => {
                  dispatch({ type: "FREE_PLAY" });
                }}
              />
            </div>
          </div>
          <div className="stack-container">
            {state.hands?.map((stack, idx) => {
              return (
                <div className="stack" key={idx}>
                  {stack.map((c) => {
                    const key = keyifyCard(c);
                    return (
                      <PlayingCard
                        key={key}
                        card={c}
                        onClick={() => {
                          dispatch({ type: "SELECT_STACK", payload: idx });
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-2">
            <PlayingCard card={state.activeCard} />
          </div>

          {state.score !== null && (
            <div className="text-white mt-4 flex flex-col">
              <p>You got {state.score} point(s)</p>
              <StampButton
                text="View Leaderboard"
                disabled={state.score == null}
                onClick={onOpenScoresModal}
              />
            </div>
          )}
        </main>

        <footer className="justify-center w-full p-2 mt-auto flex text-[#d6dbdc] text-sm">
          <Link
            href="https://github.com/RobertZetterlund/poker-squares"
            className="flex items-center space-x-2"
            target="_blank"
          >
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              priority
            />
          </Link>
        </footer>
      </div>
      <Modal onClose={onCloseScoresModal} open={scoresModalOpen}>
        <Scores dateStr={dateStr} />
      </Modal>

      <Modal
        focusTrapped
        initialFocusRef={focusRefHack}
        onClose={onCloseRulesModal}
        open={rulesModalOpen}
      >
        <span ref={focusRefHack} />
        <Rules />
      </Modal>
    </>
  );
}
