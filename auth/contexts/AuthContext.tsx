import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { http } from "../services/httpClient";

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  user: User
  isAuthenticated: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'auth.token')
  destroyCookie(undefined, 'auth.refreshToken')

  authChannel.postMessage('signOut')

  Router.push('/')
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          break;
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    if (token) {
      http.get('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
      }).catch(() => {

      })
    }

  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await http.post('/sessions', {
        email,
        password
      })

      const { token, permissions, roles, refreshToken } = response.data

      setCookie(undefined, 'auth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'                  // Quanquer url da aplicação tem acesso a este cookie
      })
      setCookie(undefined, 'auth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      http.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)