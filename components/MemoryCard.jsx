import { useMemo } from "react";
import { useAllCardsMatched, useEmojiData, useGameState } from "../context/MemoryContext";
import { useMatchedCards, useSelectedCards } from "../context/MemoryContext";
import GameOver from "./GameOver";
import Card from "./Card";
import Timer from "./Timer";

export default function MemoryCard() {
  const { isTimeOut } = useGameState();
  const {areAllCardsMatched} = useAllCardsMatched()

  const { state } = useEmojiData();
  const { matchedCards } = useMatchedCards();
  const { selectedCards } = useSelectedCards();

  console.log("MemoryCard");


  // Precompute indices to avoid re-renders
  const selectedCardIndices = useMemo(() => new Set(selectedCards.map((card) => card.index)), [selectedCards]);
  const matchedCardIndices = useMemo(() => new Set(matchedCards.map((card) => card.index)), [matchedCards]);

  const memoizedCards = useMemo(
    () =>
      state?.emojisArray.map((emoji, index) => (
        <Card
          key={index}
          emoji={emoji}
          index={index}
          isSelected={selectedCardIndices.has(index)}
          isMatched={matchedCardIndices.has(index)}
        />
      )),
    [state?.emojisArray, selectedCardIndices, matchedCardIndices]
  );

  return (
    <>
      {!state?.error && <Timer />}
      {(areAllCardsMatched || isTimeOut) && <GameOver />}

      <ul className="card-container">{memoizedCards}</ul>
    </>
  );
}