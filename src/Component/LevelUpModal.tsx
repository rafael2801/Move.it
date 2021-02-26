import { useContext } from 'react'
import { ChallengesContext } from '../Context/ChallengesContext'
import styles from '../styles/Components/LevelUpModal.module.css'

export function LevelUpModal(){

    const {level,closeLevelUpModal} = useContext(ChallengesContext)

    return(
        <div className={styles.overlay}>
        <div className={styles.container}>
            <header>{level}</header>

            <strong>Parabens</strong>
            <p>Voce alcançou um novo nivel!</p>

            <button 
            type='button'
            onClick={closeLevelUpModal}>
                <img src='/icons/close.svg'/>
            </button>

        </div>
        </div>
    )
}