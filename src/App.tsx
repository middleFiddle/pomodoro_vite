import { useState } from "react"
import Counter from "./Counter"
import Timer from "./Timer"
import "./App.css"

export default function App() {
    const [breakDur, setBreakDur] = useState(5)
    const [sessionDur, setSessionDur] = useState(25)

    return (
        <main className="flex h-screen flex-col items-center justify-evenly bg-zinc-500 text-center text-violet-300">
            <>
                <Timer
                    breakDur={breakDur}
                    sessionDur={sessionDur}
                    setBreakDur={setBreakDur}
                    setSessionDur={setSessionDur}
                />
            </>
            <div className="flex space-x-4">
                <Counter
                    duration={breakDur}
                    setDuration={setBreakDur}
                    id={"break"}
                />
                <Counter
                    duration={sessionDur}
                    setDuration={setSessionDur}
                    id={"session"}
                />
            </div>
        </main>
    )
}
