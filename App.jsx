import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import AssistiveTechInfo from '/components/AssistiveTechInfo'
import ErrorCard from '/components/ErrorCard'
import { useEmojiData, useGameState } from './context/MemoryContext'

export default function App() {

    const { isGameOn, areAllCardsMatched } = useGameState()

    const {state} = useEmojiData()

    console.log('app');

console.log(isGameOn, state.error);

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



