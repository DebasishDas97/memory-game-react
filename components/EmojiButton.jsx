import { decodeEntity } from "html-entities";
import { useGameState } from "../context/MemoryContext";
import { memo } from "react";

function EmojiButton({ emoji, index, isSelected, isMatched }) {
  const { isTimeOut, turnCard } = useGameState();

  console.log("EmojiButton rendering:", index);

  const btnContent = isSelected || isMatched ? decodeEntity(emoji.htmlCode[0]) : "?";


  const btnStyle = isMatched
    ? "btn--emoji__back--matched"
    : isSelected
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  const btnAria = isMatched
    ? `${decodeEntity(emoji.name)}. Matched.`
    : isSelected
    ? `${decodeEntity(emoji.name)}. Not matched yet.`
    : "Card upside down.";

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={isSelected ? null : () => turnCard(emoji.name, index)}
      disabled={isMatched || isTimeOut}
      aria-label={`Position ${index + 1}: ${btnAria}`}
      aria-live="polite"
    >
      {btnContent}
    </button>
  );
}

export default memo(EmojiButton);
