import { useEffect, useRef } from 'react'
import RegularButton from './RegularButton'

export default function GameOver({ handleClick, isTimeOut }) {
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
            <RegularButton handleClick={handleClick}>
                Play again
            </RegularButton>
        </div>
    )
}