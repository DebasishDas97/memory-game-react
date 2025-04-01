import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import AssistiveTechInfo from '/components/AssistiveTechInfo'
import ErrorCard from '/components/ErrorCard'
import { useAllCardsMatched, useEmojiData, useGameState } from './context/MemoryContext'

export default function App() {
    const { isGameOn } = useGameState()
    const {areAllCardsMatched} = useAllCardsMatched()

    const {state} = useEmojiData()

    console.log('app');

    return (
        <main>
            <h1>Memory</h1>

            {!state?.error && !isGameOn && <Form  />}

            {isGameOn && !areAllCardsMatched &&
                <AssistiveTechInfo />}

            {!state?.error && isGameOn &&
                <MemoryCard />
            }

            {state?.error && <ErrorCard />}
        </main>
    )
}



