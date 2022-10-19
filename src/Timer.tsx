import { useEffect, useState } from "react"

type Format = (i: number) => string

const format: Format = (i) => {
    return i < 10 ? `0${i}` : `${i}`
}

type Converter = (millis: number) => string

const converter: Converter = (millis) => {
    const minutes = Math.floor(millis / 60000)
    const seconds = (millis % 60000) / 1000
    const [_minutes, _seconds] = [format(minutes), format(seconds)]
    return `${_minutes}:${_seconds}`
}

const Timer = ({ breakDur, sessionDur, setSessionDur, setBreakDur }) => {
    const [future, setFuture] = useState(sessionDur * 60000)
    const [paused, setPaused] = useState(true)
    const [intId, setIntId] = useState(undefined)
    const [brake, setBrake] = useState(false)

    useEffect(() => {
        if (brake) {
            setFuture(breakDur * 60000)
        }

        if (!brake) {
            setFuture(sessionDur * 60000)
        }

        return () => {}
    }, [breakDur, sessionDur, brake])

    const onStart = () => {
        if (intId) {
            clearInterval(intId)
        }

        if (paused) {
            const id = setInterval(() => setFuture((prev) => prev - 1000), 1)
            setIntId(id)
        }
        setPaused((prev) => !prev)
    }

    const onReset = () => {
        if (!paused) {
            onStart()
        }
        setBreakDur(5)
        setSessionDur(25)
        brake ? setFuture(breakDur * 60000) : setFuture(sessionDur * 60000)
    }

    const boundary = (left: number): number => {
        if (left <= 0) {
            if (brake) {
                setBrake((prev) => !prev)
                setFuture(sessionDur * 60000)
                return
            }
            setBrake((prev) => !prev)
            setFuture(breakDur * 60000)
        }
        return future
    }

    return (
        <section
            id="time-display"
            className="container flex flex-col justify-evenly"
        >
            <div className="card mx-auto w-fit space-y-8">
                <div className="flex space-x-8 self-center">
                    <button id={`start_stop`} onClick={onStart}>
                        {paused ? "START" : "PAUSE"}
                    </button>
                    <button id={`reset`} onClick={onReset}>
                        RESET
                    </button>
                </div>
                <div className="mx-auto ">
                    <div
                        id="time-left"
                        className="mx-auto rounded bg-black px-3 font-mono text-9xl font-extralight text-lime-300"
                    >
                        {converter(boundary(future))}
                    </div>
                </div>
            </div>
            <h3
                id="timer-label"
                className="mt-16 font-serif text-9xl font-extralight text-sky-300"
            >
                {brake ? "Take a break!" : "You got this!"}
            </h3>
        </section>
    )
}

export default Timer
