import '../styles/global.css'

import {ChallengesProvider} from '../Context/ChallengesContext'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider >
  )
}

export default MyApp
