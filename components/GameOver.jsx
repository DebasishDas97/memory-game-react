import { useEffect, useRef } from 'react'
import RegularButton from './RegularButton'
import { useMemory } from '../context/MemoryContext';

export default function GameOver() {
    const { isTimeOut, resetGame } = useMemory()

    const divRef = useRef(null)
    console.log('game over');

    useEffect(() => {
        divRef.current.focus()
    }, [])



    return (
        <div
            className="wrapper wrapper--accent"
            tabIndex={0}
            ref={divRef}
        >
            <p className="p--large">{isTimeOut ? "Sorry, Time Out." : "Congrats! All cards are matched."}</p>
            <RegularButton handleClick={resetGame}>
                Play again
            </RegularButton>
        </div>
    )
}