import RegularButton from './RegularButton'
import Select from './Select'
import { useRef, useEffect } from 'react'

export default function Form({ action, isPending, isFirstRender }) {
    const divRef = useRef(null)

    useEffect(() => {
        !isFirstRender && divRef.current.focus()
    }, [])
    return (
        <div className="form-container" ref={divRef} tabIndex={-1}>
            <p className="p--regular">
                Customize the game by selecting an emoji category and a number of memory cards.
            </p>
            <form className="wrapper" action={action}>
                <Select />
                <RegularButton>
                    {isPending ? "Loading..." : "Start Game"}
                </RegularButton>
            </form>
        </div>
    )
}