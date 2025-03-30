import { createContext, useState, useContext, useMemo, useCallback } from "react";
import { useActionState } from 'react'
import { startTransition } from 'react'
const MemoryContext = createContext();

function MemoryContextProvider({ children }) {
    const [isGameOn, setIsGameOn] = useState(false)
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
    const [isTimeOut, setIsTimeOut] = useState(false)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [selectedCards, setSelectedCards] = useState([])

        const { state, dispatch, isPending, reset } = useResetableActionState({
            emojisArray: [{ category: "animals-and-nature", number: 10 }],
            error: false
        })


        function useResetableActionState(initialState) {
            const customAction = useCallback(async (prevState, formData) => {
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
                    setIsGameOn(true)
                    return { ...prevState, error: true }
                } finally {
                    setIsFirstRender(false)
                }

            }, [])

            const [state, dispatch, isPending] = useActionState(customAction, initialState)

            const reset = useCallback(() => {
                setIsGameOn(false)
                startTransition(() => {
                    dispatch(new FormData())
                })
            }, [])

            const value = useMemo(() => {
                return { state, dispatch, isPending, reset }
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

        const resetGame = useCallback(() => {
            setIsGameOn(false)
            setSelectedCards([])
            setMatchedCards([])
            setAreAllCardsMatched(false)
            setIsTimeOut(false)
        }, [areAllCardsMatched, isTimeOut])


    const value = { isGameOn, setIsGameOn, matchedCards, setAreAllCardsMatched, setMatchedCards, areAllCardsMatched, isTimeOut, setIsTimeOut, state, dispatch, isPending, reset, isFirstRender, selectedCards, setSelectedCards,resetGame}

    return <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>;

}

const useMemory = () => {
    const value = useContext(MemoryContext);
    if (!value) {
        throw new Error('🗣️ useBook hook used without MemoryContext');
    }

    return value;
};

export { MemoryContextProvider, useMemory }