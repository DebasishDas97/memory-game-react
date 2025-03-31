import { decodeEntity } from 'html-entities'
import { useGameState, useSelectedCards } from '../context/MemoryContext';

export default function EmojiButton({
    emoji,
    selectedCardEntry,
    matchedCardEntry,
    index,
}) {

    const {setSelectedCards, selectedCards} = useSelectedCards()
    const {isTimeOut} = useGameState()
    console.log('emoji button');

    const turnCard = (name, index) => {
        if (selectedCards.length < 2) {
          setSelectedCards(prevSelectedCards => [...prevSelectedCards, { name, index }])
        } else if (selectedCards.length === 2) {
          setSelectedCards([{ name, index }])
        }
      }


    const btnContent = selectedCardEntry || matchedCardEntry ? decodeEntity(emoji.htmlCode[0]) : "?"

    const btnStyle =
        (matchedCardEntry || isTimeOut) ? "btn--emoji__back--matched" :
        selectedCardEntry ? "btn--emoji__back--selected" :
        "btn--emoji__front"

    const btnAria =
        matchedCardEntry ? `${decodeEntity(emoji.name)}. Matched.` :
        selectedCardEntry ? `${decodeEntity(emoji.name)}. Not matched yet.` :
        "Card upside down."

    return (
        <button
            className={`btn btn--emoji ${btnStyle}`}
            onClick={selectedCardEntry ? null : () => turnCard(emoji.name, index)}
            disabled={matchedCardEntry || isTimeOut}
            aria-label={`Position ${index + 1}: ${btnAria}`}
            aria-live="polite"
        >
            {btnContent}
        </button>
    )
}