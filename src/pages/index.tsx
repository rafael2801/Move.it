import Head from "next/head";
import { ChallengeBox } from "../Component/ChallengeBox";
import { CompleteChallenges } from "../Component/CompletedChallenges";
import { CountDown } from "../Component/CountDown";
import { ExperienceBar } from "../Component/ExperienceBar";
import { Profile } from "../Component/Profile";
import { CountDownProvider } from "../Context/CountDownContext";
import styles from '../styles/pages/Home.module.css'
import { GetServerSideProps } from 'next'
import { ChallengesProvider } from "../Context/ChallengesContext";

interface HomeProps{
  level:number,
  currentExperience:number,
  challengesCompleted:number
}


export default function Home(props:HomeProps) {
  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted} >
      <div className={styles.container}>

        <Head>
          <title>Inicio | Move.It</title>
        </Head>

        <ExperienceBar />
        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted)
    }
  }
}