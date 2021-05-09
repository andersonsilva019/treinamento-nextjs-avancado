import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { withSSRAuth } from "../helpers/withSSRAuth"
import { useCan } from "../hook/useCan"
import { setupHttpClient } from "../services/http"
import { http } from "../services/httpClient"

export default function Dashboard() {

  const { user } = useAuth()

  const useCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    http.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  })

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-gray-50 text-4xl">Seja bem vindo <strong className="text-yellow-500">{user?.email}</strong></h1>
      {useCanSeeMetrics && <div className="text-gray-50">Métricas</div>}
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