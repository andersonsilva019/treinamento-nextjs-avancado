import { PlayerContextProvider } from '../contexts/PlayerContext'
import { Layout } from '../Layout'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlayerContextProvider>

  )
}

export default MyApp
