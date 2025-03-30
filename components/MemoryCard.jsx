import { useEffect, useState } from 'react';
import { useMemory } from '../context/MemoryContext';
import GameOver from './GameOver'
import Card from './Card';

export default function MemoryCard() {
    const [timer, setTimer] = useState(0)

    const {  isGameOn, areAllCardsMatched, isTimeOut, setIsTimeOut, state } = useMemory()
    console.log('memory card');


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

            {(areAllCardsMatched || isTimeOut) && <GameOver />}

            <ul className="card-container">
                {state?.emojisArray.map((emoji, index) => (<Card emoji={emoji} key={index} index={index} />))}
            </ul>
        </>
    )
}

