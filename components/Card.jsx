import { memo } from "react";
import { useMatchedCards, useSelectedCards } from "../context/MemoryContext";
import EmojiButton from "./EmojiButton";

function Card({ emoji, index }) {
  const { matchedCards } = useMatchedCards()
  const { selectedCards } = useSelectedCards()

  console.log('card');


  const selectedCardEntry = selectedCards?.find(card => card.index === index);
  const matchedCardEntry = matchedCards?.find(card => card.index === index);
  const cardStyle =
    matchedCardEntry ? "card-item--matched" :
      selectedCardEntry ? "card-item--selected" :
        "";


  return (
    <li key={index} className={`card-item ${cardStyle}`}>
      <EmojiButton
        emoji={emoji}
        selectedCardEntry={selectedCardEntry}
        matchedCardEntry={matchedCardEntry}
        index={index}
      />
    </li>
  );

}

export default memo(Card);
