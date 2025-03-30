import { useMemory } from '../context/MemoryContext';
import GameOver from './GameOver'
import Card from './Card';
import Timer from './Timer';

export default function MemoryCard() {

    const { areAllCardsMatched, isTimeOut, state } = useMemory()
    console.log('memory card');

    return (
        <>
            <Timer />
            {(areAllCardsMatched || isTimeOut) && <GameOver />}

            <ul className="card-container">
                {state?.emojisArray.map((emoji, index) => (<Card emoji={emoji} key={index} index={index} />))}
            </ul>
        </>
    )
}

