import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { FormEvent, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { withSSRGuest } from "../helpers/withSSRGuest"

export default function Home() {

  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <div
      className="h-screen flex items-center justify-center flex-col"
    >
      <h2 className="text-3xl font-bold text-gray-50 mb-8">SignIn</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-800 w-full max-w-sm p-8 rounded-md"
      >
        <label htmlFor="email" className="mb-2 text-gray-300">E-mail</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="johnDoe@johnDoe.com"
          className="py-2 px-4 bg-gray-900 text-gray-50 placeholder-gray-500 rounded-md"
        />
        <label htmlFor="password" className="mt-4 mb-2 text-gray-300">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="**************"
          className="py-2 px-4 bg-gray-900 text-gray-50 placeholder-gray-500 rounded-md"
        />
        <button
          className="py-2 px-4 mt-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-md transition-all duration-200"
          type="submit"
        >Entrar</button>
      </form>
    </div>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})