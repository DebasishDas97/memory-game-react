import { useState, useEffect, useCallback, useMemo } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import AssistiveTechInfo from '/components/AssistiveTechInfo'
import GameOver from '/components/GameOver'
import ErrorCard from '/components/ErrorCard'
import { useActionState } from 'react'
import { startTransition } from 'react'
export default function App() {
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [isGameOn, setIsGameOn] = useState(false)
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)

    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
            setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
        }
    }, [selectedCards])

    useEffect(() => {
        if (state?.emojisArray?.length && matchedCards.length === state?.emojisArray?.length) {
            setAreAllCardsMatched(true)
        }
    }, [matchedCards])

   const {state, dispatch, isPending, reset} = useResetableActionState({
        emojisArray: [{category: "animals-and-nature", number: 10}],
        error: false
    })

    function useResetableActionState(initialState) {
    const customAction = useCallback(async (prevState,formData) => {

        const formValues = Object.fromEntries(formData)

        if (Object.keys(formValues).length === 0) {
            return initialState
        }

        const { category, number } = formValues

        try {
            const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${category}`)

            if (!response.ok) {
                throw new Error("Could not fetch data from API")
            }

            const data = await response.json()
            const dataSlice = await getDataSlice(data, number)
            const emojisArray = await getEmojisArray(dataSlice)

            setIsGameOn(true)
            return { emojisArray, error: false }

        } catch (err) {
            setIsFirstRender(false)

            return { ...prevState, error: true }
        }

        }, [])

        const [state, dispatch, isPending] = useActionState(customAction, initialState)

        const reset = useCallback(() => {
            startTransition(() => {
            dispatch(new FormData())
            })
        }, [])

        const value = useMemo(() => {
            return {state, dispatch, isPending, reset}
        }, [state, dispatch, isPending, reset])

        return value
    }


    async function getDataSlice(data, number) {
        const randomIndices = getRandomIndices(data, number)
        const dataSlice = randomIndices.reduce((array, index) => {
            array.push(data[index])
            return array
        }, [])

        return dataSlice
    }

    function getRandomIndices(data, number) {
        const randomIndicesArray = []

        for (let i = 0; i < number / 2; i++) {
            const randomNum = Math.floor(Math.random() * data.length)
            if (!randomIndicesArray.includes(randomNum)) {
                randomIndicesArray.push(randomNum)
            } else {
                i--
            }
        }

        return randomIndicesArray
    }

    async function getEmojisArray(data) {
        const pairedEmojisArray = [...data, ...data]

        for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = pairedEmojisArray[i]
            pairedEmojisArray[i] = pairedEmojisArray[j]
            pairedEmojisArray[j] = temp
        }

        return pairedEmojisArray
    }

    function turnCard(name, index) {
        if (selectedCards.length < 2) {
            setSelectedCards(prevSelectedCards => [...prevSelectedCards, { name, index }])
        } else if (selectedCards.length === 2) {
            setSelectedCards([{ name, index }])
        }
    }

    function resetGame() {
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setAreAllCardsMatched(false)
    }

    function resetError() {
        reset()
    }

    return (
        <main>
            <h1>Memory</h1>
            {!state?.error && !isGameOn && <Form action={dispatch} isFirstRender={isFirstRender} isPending={isPending} />}
            {isGameOn && !areAllCardsMatched &&
                <AssistiveTechInfo emojisData={state?.emojisArray} matchedCards={matchedCards} />}
            {areAllCardsMatched && <GameOver handleClick={resetGame} />}
            {isGameOn &&
                <MemoryCard
                    handleClick={turnCard}
                    data={state?.emojisArray}
                    selectedCards={selectedCards}
                    matchedCards={matchedCards}
                />
            }
            {state?.error && <ErrorCard handleClick={resetError} />}
        </main>
    )
}



