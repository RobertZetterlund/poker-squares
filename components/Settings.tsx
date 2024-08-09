import { PlayingCard } from "./Card";
import { useSettingsContext } from "@/context/SettingsContext";

export const Settings = () => {
  const { autoPlay, changeAutoPlay, changeContrast, contrast } =
    useSettingsContext();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl">Settings</h1>
      <div className="flex flex-col gap-2">
        <label className="flex gap-1">
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={(e) => changeAutoPlay(e.target.checked)}
          />
          <span>
            Autoplay forced action (last card of round will be put on pile)
          </span>
        </label>
        <div>
          <label className="flex gap-1">
            <input
              type="checkbox"
              checked={contrast}
              onChange={(e) => changeContrast(e.target.checked)}
            />
            Prefer strong contrast.
          </label>
          <div className="flex flex-row gap-1 ml-1 justify-center mt-1">
            <PlayingCard card={{ Suit: "H", Value: 7 }} />
            <PlayingCard card={{ Suit: "S", Value: 14 }} />
            <PlayingCard card={{ Suit: "D", Value: 12 }} />
            <PlayingCard card={{ Suit: "C", Value: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
