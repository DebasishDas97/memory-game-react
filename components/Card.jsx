import { memo, useEffect } from "react";
import { useMemory } from "../context/MemoryContext";
import EmojiButton from "./EmojiButton";

function Card({ emoji, index }) {

  const { selectedCards, matchedCards, state, setMatchedCards, setAreAllCardsMatched, isTimeOut } = useMemory()
  console.log('card');


  useEffect(() => {
    if (selectedCards?.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
    }
  }, [selectedCards])

  useEffect(() => {
    if (state?.emojisArray?.length && matchedCards.length === state?.emojisArray?.length && !isTimeOut) {
      setAreAllCardsMatched(true)
    }
  }, [matchedCards])



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

export default memo(Card)