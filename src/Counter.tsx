import { useState, useEffect } from "react"

const Counter = ({ duration, id, setDuration }) => {
    const [display, setDisplay] = useState(duration)

    useEffect(() => {
        setDisplay(duration)

        return () => {}
    }, [duration])

    const increment = () => {
        setDuration((p) => p + 1)
    }

    const decrement = () => {
        if (display > 0) {
            setDuration((p) => p - 1)
        }
    }

    return (
        <div className="card">
            <h1 id={`${id}-label`}>{`${id[0].toUpperCase()}${id.slice(
                1
            )} Length`}</h1>
            <div className="flex items-center justify-evenly">
                <button id={`${id}-decrement`} onClick={decrement}>
                    -
                </button>
                <div id={`${id}-length`} className="p-8 text-4xl">
                    {display}
                </div>
                <button id={`${id}-increment`} onClick={increment}>
                    +
                </button>
            </div>
        </div>
    )
}

export default Counter
