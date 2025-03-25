import { createContext, useEffect, useState, useContext} from "react";

const MemoryContext = createContext();

 function MemoryContextProvider({children}) {
      const [timer, setTimer] = useState(0)
        const [isTimeOut, setIsTimeOut] = useState(false)
        const [isGameOn, setIsGameOn] = useState(false)
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)

        useEffect(() => {
            if (!isGameOn || isTimeOut || areAllCardsMatched) return;

            const timeCount = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer >= 5) {
                        setIsTimeOut(true);
                        return 0;
                    }
                    return prevTimer + 1;
                });
            }, 1000);

            return () => clearInterval(timeCount);
        }, [isGameOn, isTimeOut, areAllCardsMatched]);
        const value = {isTimeOut, timer, setTimer, setIsTimeOut, isGameOn, setIsGameOn, matchedCards, setMatchedCards}

        return <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>;

}

const useMemory = () => {
    const value = useContext(MemoryContext);
    if (!value) {
      throw new Error('🗣️ useBook hook used without BookContext');
    }

    return value;
  };

  export {MemoryContextProvider, useMemory}