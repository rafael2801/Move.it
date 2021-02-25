import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json'

interface Challenges {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    activeChallenges: Challenges
    experienceToNextLevel: number
    levelUp: () => void,
    newChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode
}


export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenges, setActiveChallenges] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(()=>{
        Notification.requestPermission()
    },[])

    function levelUp() {
        setLevel(level+1)
    }
    function newChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenges(challenge)


        new Audio('/notification.mp3').play()

        if(Notification.permission==='granted'){
            new Notification('Novo Desafio Chefe!',{
                body:`Valendo ${challenge.amount}XP!`
            })
        }
    }
    function resetChallenge() {
        setActiveChallenges(null)
    }
    function completeChallenge() {
        if (!activeChallenges){
            return ;
        }
        const {amount} = activeChallenges
        let finalExperience = currentExperience+amount

        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenges(null)
        setChallengesCompleted(challengesCompleted+1)
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            newChallenge,
            levelUp,
            activeChallenges,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge
        }} >
            {children}
        </ChallengesContext.Provider>
    )
}