import { withSSRAuth } from "../helpers/withSSRAuth"
import { setupHttpClient } from "../services/http"


export default function Metrics() {

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="text-gray-50 text-4xl">Métricas</div>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const httpClient = setupHttpClient(ctx)
  const response = await httpClient.get('/me')

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})