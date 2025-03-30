import { useMemory } from '../context/MemoryContext'
import RegularButton from './RegularButton'
import Select from './Select'
import { useRef, useEffect } from 'react'

export default function Form() {
    const {isFirstRender, dispatch, isPending } = useMemory()
    const divRef = useRef(null)
    console.log('form');

    useEffect(() => {
        !isFirstRender && divRef.current.focus()
    }, [])
    return (
        <div className="form-container" ref={divRef} tabIndex={-1}>
            <p className="p--regular">
                Customize the game by selecting an emoji category and a number of memory cards.
            </p>
            <form className="wrapper" action={dispatch}>
                <Select />
                <RegularButton>
                    {isPending ? "Loading..." : "Start Game"}
                </RegularButton>
            </form>
        </div>
    )
}