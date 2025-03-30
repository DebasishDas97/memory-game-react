import { useMemory } from "../context/MemoryContext"

export default function AssistiveTechInfo() {
   const {matchedCards, state} = useMemory()

    return (
        <section className="sr-only" aria-live="polite" aria-atomic="true">
            <h2>Game status</h2>
            <p>Number of matched pairs: {matchedCards.length / 2}</p>
            <p>Number of cards left to match: {state?.emojisArray?.length - matchedCards.length}</p>
        </section>
    )
}