import { useCallback, useState } from "react";

export const StampButton = ({
  disabled,
  text,
  onClick,
}: {
  disabled?: boolean;
  text: string;
  onClick: () => void;
}) => {
  const [pressed, setPressed] = useState(false);

  const handleOnClick = useCallback(() => {
    setPressed(true);
    setTimeout(() => {
      onClick();
      setPressed(false);
    }, 200);
  }, [onClick]);

  return (
    <button
      className="stamp-button"
      onClick={handleOnClick}
      type="submit"
      disabled={disabled}
    >
      <span
        style={disabled ? { cursor: "not-allowed" } : undefined}
        className={"button-span " + (pressed ? "press" : "")}
      >
        {text}
      </span>
    </button>
  );
};
