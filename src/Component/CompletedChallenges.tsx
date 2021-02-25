import { useContext } from "react"
import { ChallengesContext } from "../Context/ChallengesContext"
import styles from  "../styles/Components/CompletedChallenges.module.css"

export function CompleteChallenges(){

    const {challengesCompleted} = useContext(ChallengesContext)

    return(
        <div className={styles.CCC}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}