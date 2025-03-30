import { useEffect, useState } from "react";
import { useMemory } from "../context/MemoryContext"

export default function Timer() {
    const [timer, setTimer] = useState(0)
    const {isGameOn, isTimeOut, setIsTimeOut, areAllCardsMatched} = useMemory()

    console.log('timer');

    useEffect(() => {
        if (!isGameOn || isTimeOut || areAllCardsMatched) return;

        const timeCount = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => clearInterval(timeCount);
    }, [isGameOn, isTimeOut, areAllCardsMatched]);

    useEffect(() => {
        if (timer >= 14) {
            setIsTimeOut(true);
            setTimer(0);
        }
    }, [timer]);

  return (
    <>
    {isGameOn && !isTimeOut && <p>Time: {timer}</p>}
    </>
  )
}