import { FormEvent, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import styles from './home.module.css'

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
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        name=""
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name=""
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  )
}
