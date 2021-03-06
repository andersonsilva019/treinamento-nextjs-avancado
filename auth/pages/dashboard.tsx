import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Can } from '../components/Can'
import { withSSRAuth } from "../helpers/withSSRAuth"
import { setupHttpClient } from "../services/http"
import { http } from "../services/httpClient"

export default function Dashboard() {

  const { user, signOut } = useAuth()

  useEffect(() => {
    http.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  })

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-gray-50 text-4xl">Seja bem vindo <strong className="text-yellow-500">{user?.email}</strong></h1>
      <Can permissions={['metrics.list']}>
        <div className="text-gray-50">Métricas</div>
      </Can>
      <button
        onClick={signOut}
        className="py-2 px-4 mt-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-md transition-all duration-200"
        type="submit"
      >SignOut</button>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const httpClient = setupHttpClient(ctx)
  const response = await httpClient.get('/me')

  return {
    props: {}
  }
})