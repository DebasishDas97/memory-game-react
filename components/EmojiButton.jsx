import { decodeEntity } from 'html-entities'
import { MemoryContext } from '../App';
import { useContext } from 'react';

export default function EmojiButton({
    emoji,
    selectedCardEntry,
    matchedCardEntry,
    index,

}) {

    const {isTimeOut, turnCard} = useContext(MemoryContext)
    console.log('emoji button');

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