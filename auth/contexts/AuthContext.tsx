import { createContext, ReactNode, useContext, useState } from "react";
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

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await http.post('/sessions', {
        email,
        password
      })

      const { permissions, roles } = response.data

      setUser({
        email,
        permissions,
        roles
      })

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