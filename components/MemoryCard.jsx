import EmojiButton from './EmojiButton'

export default function MemoryCard({ data, selectedCards, matchedCards }) {
    const cardEl = data.map((emoji, index) => {
        console.log('memory card');

        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)
        const cardStyle =
            matchedCardEntry ? "card-item--matched" :
            selectedCardEntry ? "card-item--selected" :
            ""

        return (
            <li key={index} className={`card-item ${cardStyle}`}>
                <EmojiButton
                    emoji={emoji}
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}
                    index={index}
                />
            </li>
        )
    })

    return <ul className="card-container">{cardEl}</ul>
}