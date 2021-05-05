import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Routes from 'next/router'
import { http } from "../services/http";

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
  signIn(credentials: SignInCredentials): Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)


export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    if (token) {
      http.get('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
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

      Routes.push('/dashboard')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)