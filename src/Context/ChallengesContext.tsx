import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from "../Component/LevelUpModal";

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
    closeLevelUpModal:()=>void;
}

interface ChallengesProviderProps {
    children: ReactNode
    level:number,
    currentExperience:number,
    challengesCompleted:number
}



export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children,...rest }: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 1)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 1)
    const [activeChallenges, setActiveChallenges] = useState(null)
    const [isLevelUpModalOpen,setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(()=>{
        Notification.requestPermission()
    },[])

    useEffect(()=>{
        Cookies.set('level',level.toString())
        Cookies.set('currentExperience',currentExperience.toString())
        Cookies.set('challengesCompleted',challengesCompleted.toString())
    }
        ,[level,currentExperience,challengesCompleted])

    function levelUp() {
        setLevel(level+1)
        setIsLevelUpModalOpen(true)
    }
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
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
            completeChallenge,
            closeLevelUpModal
        }} >
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}