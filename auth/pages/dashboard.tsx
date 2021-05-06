import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { http } from "../services/http"

export default function Dashboard() {

  const { user } = useAuth()

  useEffect(() => {
    http.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  })

  return (
    <h1>Dashboard {user?.email}</h1>
  )
}