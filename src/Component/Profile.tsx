import { useContext } from 'react'
import { ChallengesContext } from '../Context/ChallengesContext'
import styles from '../styles/Components/Profile.module.css'

export function Profile(){

    const {level} = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}> 
            <img src='https://www.designerd.com.br/wp-content/uploads/2019/05/perspectiva-e-angulo-para-fotos-como-fugir-do-lugar-comum-capa.jpg' alt='Minha Foto'/>
            <div>
                <strong>Rafael Silva</strong>
                <p>
                    <img src='icons/level.svg' />
                    Level {level}
                </p>
            </div>
        </div>
    )
}