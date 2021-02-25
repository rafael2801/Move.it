import  Head  from "next/head";
import { ChallengeBox } from "../Component/ChallengeBox";
import { CompleteChallenges } from "../Component/CompletedChallenges";
import { CountDown } from "../Component/CountDown";
import { ExperienceBar } from "../Component/ExperienceBar";
import { Profile } from "../Component/Profile";
import { CountDownProvider } from "../Context/CountDownContext";
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

    <Head>
      <title>Inicio | Move.It</title>
    </Head>

      <ExperienceBar />
      <CountDownProvider>
      <section>
        <div>
          <Profile />
          <CompleteChallenges/>
          <CountDown/>
        </div>
        <div>
          <ChallengeBox/>
        </div>
      </section>
      </CountDownProvider>
    </div>
  )
}  
