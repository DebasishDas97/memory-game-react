import { createContext, useState, useContext, useMemo, useCallback, useEffect } from "react";
import { useActionState } from "react";
import { startTransition } from "react";

const GameStateContext = createContext();
const MatchedCardsContext = createContext();
const SelectedCardsContext = createContext();
const EmojiDataContext = createContext();
const AllCardsMatchedContext = createContext();

function useResetableActionState(initialState, setIsGameOn, setIsFirstRender) {

    const customAction = useCallback(async (prevState, formData) => {
        const formValues = Object.fromEntries(formData);

        if (Object.keys(formValues).length === 0) {
            return initialState;
        }

        const { category, number } = formValues;

        try {
            const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${category}`);

            if (!response.ok) {
                throw new Error("Could not fetch data from API");
            }

            const data = await response.json();
            const dataSlice = await getDataSlice(data, number);
            const emojisArray = await getEmojisArray(dataSlice);

            setIsGameOn(true);
            return { emojisArray, error: false };
        } catch (err) {
            setIsGameOn(false);
            return { ...prevState, error: true };
        } finally {
            setIsFirstRender(false);
        }
    }, []);

    const [state, dispatch, isPending] = useActionState(customAction, initialState);

    const reset = useCallback(() => {
        setIsGameOn(false);
        startTransition(() => {
            dispatch(new FormData());
        });
    }, []);

    return useMemo(() => ({ state, dispatch, isPending, reset }), [state, dispatch, isPending, reset]);
}

function MemoryContextProvider({ children }) {
    const [isGameOn, setIsGameOn] = useState(false);
    const [matchedCards, setMatchedCards] = useState([]);
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const { state, dispatch, isPending, reset } = useResetableActionState(
        { emojisArray: [{ category: "animals-and-nature", number: 10 }], error: false },
        setIsGameOn,
        setIsFirstRender
    );

    const resetGame = useCallback(() => {
        setIsGameOn(false);
        setSelectedCards([]);
        setMatchedCards([]);
        setAreAllCardsMatched(false);
        setIsTimeOut(false);
    }, []);

    const turnCard = useCallback(
        (name, index) => {
            setSelectedCards((prevSelectedCards) => {
                if (prevSelectedCards.length < 2) {
                    return [...prevSelectedCards, { name, index }];
                } else {
                    return [{ name, index }];
                }
            });
        },
        []
    );

    const allMatchedCardsValue = useMemo(() => ({
        areAllCardsMatched,
        setAreAllCardsMatched,
    }), [areAllCardsMatched]);

    const gameStateValue = useMemo(() => ({
        isGameOn,
        setIsGameOn,
        isTimeOut,
        setIsTimeOut,
        isFirstRender,
        setIsFirstRender,
        resetGame,
        turnCard
    }), [isGameOn, areAllCardsMatched, isTimeOut, isFirstRender, resetGame]);

    const matchedCardsValue = useMemo(() => ({
        matchedCards,
        setMatchedCards,
    }), [matchedCards]);

    const selectedCardsValue = useMemo(() => ({
        selectedCards,
        setSelectedCards,
    }), [selectedCards]);

    const emojiDataValue = useMemo(() => ({
        state,
        dispatch,
        isPending,
        reset,
    }), [state, dispatch, isPending, reset]);

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


    return (
        <GameStateContext.Provider value={gameStateValue}>
            <MatchedCardsContext.Provider value={matchedCardsValue}>
                <SelectedCardsContext.Provider value={selectedCardsValue}>
                    <EmojiDataContext.Provider value={emojiDataValue}>
                        <AllCardsMatchedContext.Provider value={allMatchedCardsValue}>
                        {children}
                        </AllCardsMatchedContext.Provider>
                    </EmojiDataContext.Provider>
                </SelectedCardsContext.Provider>
            </MatchedCardsContext.Provider>
        </GameStateContext.Provider>
    );
}

const useGameState = () => useContext(GameStateContext);
const useMatchedCards = () => useContext(MatchedCardsContext);
const useSelectedCards = () => useContext(SelectedCardsContext);
const useEmojiData = () => useContext(EmojiDataContext);
const useAllCardsMatched = () => useContext(AllCardsMatchedContext);

export { MemoryContextProvider, useGameState, useMatchedCards, useSelectedCards, useEmojiData, useAllCardsMatched };

async function getDataSlice(data, number) {
    const randomIndices = getRandomIndices(data, number);
    return randomIndices.map(index => data[index]);
}

function getRandomIndices(data, number) {
    const randomIndicesSet = new Set();
    while (randomIndicesSet.size < number / 2) {
        randomIndicesSet.add(Math.floor(Math.random() * data.length));
    }
    return Array.from(randomIndicesSet);
}

async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairedEmojisArray[i], pairedEmojisArray[j]] = [pairedEmojisArray[j], pairedEmojisArray[i]];
    }
    return pairedEmojisArray;
}
