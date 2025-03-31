import { useEffect, useRef } from 'react'
import RegularButton from "./RegularButton"
import { useEmojiData } from '../context/MemoryContext'
export default function ErrorCard() {
    const { reset } = useEmojiData()
    function resetError() {
        reset()
    }

    const errorRef = useRef(null)
    useEffect(() => {
        errorRef.current.focus()
    }, [])
    return (
        <div className="wrapper wrapper--accent" ref={errorRef} tabIndex={-1}>
            <p className="p--large">Sorry, there was an error.</p>
            <p className="p--regular">Please come back later or click the button below to try restarting the game.</p>
            <RegularButton handleClick={resetError}>
                Restart Game
            </RegularButton>
        </div>
    )
}