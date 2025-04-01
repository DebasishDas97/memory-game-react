import { memo } from "react";
import EmojiButton from "./EmojiButton";

function Card({ emoji, index, isSelected, isMatched }) {
  console.log("Card rendering:", index);

  const cardStyle = isMatched ? "card-item--matched" : isSelected ? "card-item--selected" : "";

  return (
    <li className={`card-item ${cardStyle}`}>
      <EmojiButton emoji={emoji} index={index} isSelected={isSelected} isMatched={isMatched} />
    </li>
  );
}

export default memo(Card);
