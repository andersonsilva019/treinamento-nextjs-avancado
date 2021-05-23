import { signIn, useSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router"
import { api } from "../services/api"
import { getStripeJs } from "../services/stripe-client"



export function SubscribeButton() {

  const [session] = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    if (session?.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
    }

  }

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className="
      h-16 w-64 border-0 rounded-3 
      bg-yellow-500 text-gray-900 
      text-xl font-bold 
      flex items-center justify-center
      filter brightness-90 hover:filter-none
      transition-all duration-200
      mt-10
    ">
      Subscribe now
    </button>
  )
}