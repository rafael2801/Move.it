import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Components/CountDown.module.css'

import {CountDownContext} from '../Context/CountDownContext'


export function CountDown() {

    const { 
        minutes,
        seconds,
        terminou,
        active,
        startCountDown,
        resetCD
     } = useContext(CountDownContext)
   
    const [minuteLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

    
    return (
        <div>
            <div className={styles.CDContainer}>
                <div>
                    <span>
                        {minuteLeft}
                    </span>
                    <span>
                        {minutesRight}
                    </span>
                </div>
                <span>
                    :
            </span>
                <div>
                    <span>
                        {secondsLeft}
                    </span>
                    <span>
                        {secondsRight}
                    </span>
                </div>
            </div>
            {terminou ? (
                <button type='button' disabled className={`${styles.startCDButtonActive} ${styles.startCDButton} `} onClick={resetCD}>
                    Ciclo Encerrado
                </button>
            ):(
                <>
                {active ? (
                <button type='button' className={`${styles.startCDButtonActive} ${styles.startCDButton} `} onClick={resetCD}>
                    Abandonar ciclo
                </button>
            ) : (
                    <button type='button' className={styles.startCDButton} onClick={startCountDown}>
                        Iniciar
                    </button>
                )}
                </>
            )}
            

        </div>

    )
}
