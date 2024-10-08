"use client";
import { Card, getDeck, Hand, rankPokerHand } from "@/utils/scorePokerHand";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { current, produce } from "immer";
import { submitScore } from "@/app/actions";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PlayingCard } from "@/components/Card";
import { StampButton } from "@/components/StampButton";
import { Scores } from "@/components/Scores";
import { Rules } from "@/components/Rules";
import Link from "next/link";
import Image from "next/image";
import { Droppable } from "./DroppableStack";
import { Draggable } from "./Draggable";
import { Settings } from "@/components/Settings";
import { useSettingsContext } from "@/context/SettingsContext";

const dateStr = new Date().toISOString().split("T")[0].replaceAll("-", "_");

type GameState = {
  deck: Card[] | null;
  activeCard: Card;
  hands: Hand[];
  score: number | null;
  round: number;
  isFreePlay: boolean;
  autoPlay: boolean;
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
    }
  | {
      type: "SET_AUTOPLAY";
      payload: boolean;
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
        draftState.autoPlay = state.autoPlay;
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
        }
        if (state.autoPlay) {
          // if there is only one available pile left, place the card there
          if (
            draftState.hands.filter((pile) => pile.length === draftState.round)
              .length === 1
          ) {
            const idx = draftState.hands.findIndex(
              (pile) => pile.length === draftState.round
            );
            if (idx !== -1) {
              const newCard = draftState.deck?.pop()!;
              draftState.hands[idx].push(draftState.activeCard);
              draftState.activeCard = newCard;
              if (draftState.hands.every((h) => h.length === state.round + 1)) {
                draftState.round++;
              }
              if (draftState.hands.every((h) => h.length === 5)) {
                draftState.score = draftState.hands.reduce((sum, hand) => {
                  return sum + rankPokerHand(hand);
                }, 0);
              }
            }
          }
        }
        return draftState;
      }
      case "SET_AUTOPLAY": {
        draftState.autoPlay = !!action.payload;
        return draftState;
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
    autoPlay: false,
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

  const { autoPlay } = useSettingsContext();

  useEffect(() => {
    dispatch({ payload: autoPlay, type: "SET_AUTOPLAY" });
  }, [autoPlay]);

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

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const onOpenSettingsModal = useCallback(() => setSettingsModalOpen(true), []);
  const onCloseSettingsModal = useCallback(
    () => setSettingsModalOpen(false),
    []
  );

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

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const onHandleDragEnd = useCallback((e: DragEndEvent) => {
    if (e.over?.id) {
      dispatch({ type: "SELECT_STACK", payload: Number(e.over.id) });
    }
  }, []);

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

            <div className="flex gap-1">
              <button
                className="border border-gray-300 p-1 shadow-lg"
                onClick={onOpenRulesModal}
              >
                Rules
              </button>
              <button
                className="border border-gray-300 p-1 shadow-lg"
                onClick={onOpenSettingsModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 32 32"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M13.9 3.38A.5.5 0 0 1 14.4 3h3.22a.5.5 0 0 1 .48.38l.7 2.76a.52.52 0 0 0 .33.36c.39.12.76.27 1.12.44a.52.52 0 0 0 .45 0l2.77-1.39a.5.5 0 0 1 .57.1l2.32 2.32a.5.5 0 0 1 .1.57l-1.39 2.77a.52.52 0 0 0 0 .45c.13.27.24.55.35.83.05.15.17.27.31.32l2.94.98a.5.5 0 0 1 .34.47v3.28a.5.5 0 0 1-.34.47l-2.94.98a.52.52 0 0 0-.32.32 9.94 9.94 0 0 1-.34.83.52.52 0 0 0 0 .45l1.39 2.77a.5.5 0 0 1-.1.57l-2.32 2.32a.5.5 0 0 1-.57.1l-2.77-1.39a.52.52 0 0 0-.45 0 10 10 0 0 1-.83.35.52.52 0 0 0-.32.31l-.98 2.94a.5.5 0 0 1-.47.34h-3.28a.5.5 0 0 1-.47-.34l-.98-2.94a.52.52 0 0 0-.32-.32 9.95 9.95 0 0 1-1.1-.47.52.52 0 0 0-.5.01l-2.43 1.47a.5.5 0 0 1-.61-.08l-2.28-2.28a.5.5 0 0 1-.08-.6L7.06 21a.52.52 0 0 0 .01-.5 9.94 9.94 0 0 1-.57-1.39.52.52 0 0 0-.36-.34l-2.76-.69a.5.5 0 0 1-.38-.48v-3.22a.5.5 0 0 1 .38-.49l2.76-.68a.52.52 0 0 0 .36-.35c.16-.47.35-.93.57-1.38a.52.52 0 0 0-.01-.5L5.59 8.56a.5.5 0 0 1 .08-.61l2.28-2.28a.5.5 0 0 1 .6-.08L11 7.06c.16.09.34.1.5.01a9.94 9.94 0 0 1 1.38-.57.52.52 0 0 0 .35-.36l.69-2.76z"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </button>
            </div>
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
          <DndContext
            sensors={sensors}
            onDragEnd={onHandleDragEnd}
            autoScroll={{
              layoutShiftCompensation: false,
              threshold: { x: 0, y: 0.2 },
              enabled: false,
            }}
          >
            <div className="stack-container">
              {state.hands?.map((stack, idx) => {
                return (
                  <Droppable id={idx + ""} key={idx}>
                    <div className="stack">
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
                  </Droppable>
                );
              })}
            </div>

            <div className="mt-8 flex gap-2 border-dashed border border-yellow-300 p-1">
              <Draggable id="playing-card" disabled={state.score !== null}>
                <PlayingCard card={state.activeCard} />
              </Draggable>
            </div>
          </DndContext>

          {state.score !== null && (
            <div className="text-white mt-4 flex flex-col text-center">
              <p className="mb-1">You got {state.score} points</p>
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

      <Modal onClose={onCloseSettingsModal} open={settingsModalOpen}>
        <Settings />
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
