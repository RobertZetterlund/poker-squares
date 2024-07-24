import { PlayingCard } from "./Card";

export const Rules = () => {
  return (
    <>
      <h1 className="text-3xl">Rules</h1>
      <br />
      <p>
        Five poker hands are created and scored separately. One card at a time
        is added to a hand, but there must be two cards in each pile before the
        third row begins, three cards in each pile before the fourth row begins,
        etc. The procedure continues until there are five cards in each pile.
        The aim is to try to put poker hands in each pile, which give points.
      </p>
      <br />
      <ol className="flex flex-col gap-2">
        <li>
          <span>
            A pair gives one point
            <div className="mt-1 flex gap-2 items-center">
              <PlayingCard card={{ Suit: "C", Value: 12 }} inline />
              <PlayingCard card={{ Suit: "D", Value: 12 }} inline />
              <span>= 1pt</span>
            </div>
          </span>
        </li>
        <li>
          Two pair gives two points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "C", Value: 8 }} inline />
            <PlayingCard card={{ Suit: "D", Value: 8 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 11 }} inline />
            <PlayingCard card={{ Suit: "C", Value: 11 }} inline />
            <span>= 2pts</span>
          </div>
        </li>
        <li>
          Three of a kind gives three points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "C", Value: 14 }} inline />
            <PlayingCard card={{ Suit: "D", Value: 14 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 14 }} inline />
            <span>= 3pts</span>
          </div>
        </li>
        <li>
          Straight gives four points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "C", Value: 2 }} inline />
            <PlayingCard card={{ Suit: "D", Value: 3 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 4 }} inline />
            <PlayingCard card={{ Suit: "C", Value: 5 }} inline />
            <PlayingCard card={{ Suit: "S", Value: 6 }} inline />
            <span>= 4pts</span>
          </div>
        </li>
        <li>
          Flush gives five points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "H", Value: 12 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 8 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 3 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 2 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 9 }} inline />
            <span>= 5pts</span>
          </div>
        </li>
        <li>
          Full house gives six points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "C", Value: 11 }} inline />
            <PlayingCard card={{ Suit: "D", Value: 11 }} inline />
            <PlayingCard card={{ Suit: "C", Value: 6 }} inline />
            <PlayingCard card={{ Suit: "D", Value: 6 }} inline />
            <PlayingCard card={{ Suit: "S", Value: 6 }} inline />
            <span>= 6pts</span>
          </div>
        </li>
        <li>
          Four of a kind gives seven points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "S", Value: 14 }} inline />
            <PlayingCard card={{ Suit: "D", Value: 14 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 14 }} inline />
            <PlayingCard card={{ Suit: "C", Value: 14 }} inline />
            <span>= 7pts</span>
          </div>
        </li>
        <li>
          Straight flush gives eight points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "H", Value: 2 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 3 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 4 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 5 }} inline />
            <PlayingCard card={{ Suit: "H", Value: 6 }} inline />
            <span>= 8pts</span>
          </div>
        </li>
        <li>
          Royal flush gives nine points
          <div className="mt-1 flex gap-2 items-center">
            <PlayingCard card={{ Suit: "S", Value: 10 }} inline />
            <PlayingCard card={{ Suit: "S", Value: 11 }} inline />
            <PlayingCard card={{ Suit: "S", Value: 12 }} inline />
            <PlayingCard card={{ Suit: "S", Value: 13 }} inline />
            <PlayingCard card={{ Suit: "S", Value: 14 }} inline />
            <span>= 9pts</span>
          </div>
        </li>
      </ol>
      <br />
      <p>
        Maximum score is thus 44. According to{" "}
        <a
          href="https://sv.wikipedia.org/wiki/Pokerpatiens"
          target="_blank"
          className="underline"
        >
          swedish wikipedia
        </a>
        {", "}
        15 points can be considered a very good result and more than 20 points
        is rare.
      </p>
    </>
  );
};
