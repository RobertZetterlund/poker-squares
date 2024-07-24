import { Card } from "@/utils/scorePokerHand";
import { memo } from "react";

const jumpX = 71;
const jumpY = 95;

const suitMap: Record<Card["Suit"], number> = {
  H: 0,
  C: 1,
  D: 2,
  S: 3,
};

export const PlayingCard = memo<{
  card: Card;
  onClick?: () => void;
  inline?: boolean;
}>(
  function PlayingCard({ card, onClick, inline = false }) {
    const yOffset = suitMap[card.Suit] * jumpY;
    const xOffset = (card.Value - 2) * jumpX;

    return (
      <div
        className={`card-wrapper ${inline ? "inlined" : ""}`}
        onClick={onClick}
      >
        <div
          className="card"
          style={{
            backgroundImage: `url(cards_sprite.png)`,
            backgroundPositionX: -xOffset + "px",
            backgroundPositionY: -yOffset + "px",
          }}
        />
      </div>
    );
  },
  (prevProps, currProps) => {
    // don't really care about the onClick changing
    return (
      prevProps.card.Suit === currProps.card.Suit &&
      prevProps.card.Value === currProps.card.Value
    );
  }
);
