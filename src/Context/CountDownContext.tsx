import { createContext,useContext,useState ,useEffect, ReactNode } from "react";
import {ChallengesContext} from './ChallengesContext'

interface CountDownContextData{
    minutes:number,
    seconds:number,
    terminou:boolean,
    active:boolean,
    startCountDown:()=>void,
    resetCD:()=>void;
}
interface CountDownProviderProps{
    children:ReactNode
}
let CDTimeOut: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({children}: CountDownProviderProps){
    const {newChallenge} = useContext(ChallengesContext)

    const [time, setTime] = useState(0.1 * 60)
    const [active, setActive] = useState(false)
    const [terminou, setTerminou] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60

    function startCountDown() {
        setActive(true)

    }

    function resetCD() {
        clearTimeout(CDTimeOut)
        setActive(false)
        setTime(0.1 * 60)
        setTerminou(false)
    }

    useEffect(() => {
        if (active && time > 0) {
            CDTimeOut = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else if (active && time === 0) {
            setTerminou(true)
            setActive(false)
            newChallenge()
        }
    }, [active, time])

    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            terminou,
            active,
            startCountDown,
            resetCD
        }}>
            {
                children
            }
        </CountDownContext.Provider>
    )
}