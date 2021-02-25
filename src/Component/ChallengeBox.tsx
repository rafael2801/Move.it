import { useContext, useState } from 'react'
import { ChallengesContext } from '../Context/ChallengesContext'
import { CountDownContext } from '../Context/CountDownContext'
import styles from '../styles/Components/ChallengeBox.module.css'

export function ChallengeBox() {

    const {activeChallenges,resetChallenge,completeChallenge} = useContext(ChallengesContext)
    const {resetCD} = useContext(CountDownContext)
    
    function handleChallengeSucc(){
        completeChallenge()
        resetCD()
    }
    function handleChallengeFailed(){
        resetChallenge()
        resetCD()
    }

    return (
        <div className={styles.ChallengeBoxContainer}>
            {activeChallenges ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenges.amount}xp</header>
                    <main>
                        <img src='icons/body.svg' />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenges.description}</p>
                    </main>
                    <footer>
                        <button
                            type='button'
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type='button'
                            className={styles.challengeSuccButton}
                            onClick={handleChallengeSucc}
                        >
                            Completei
                        </button>
                    </footer>

                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio!</strong>
                        <p>
                            <img src='icons/level-up.svg' alt='Level Up' />
                    Avance de level completando desafios.
                </p>
                    </div>
                )}
        </div>
    )
}