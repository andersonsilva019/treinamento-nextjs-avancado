import { createContext, ReactNode, useContext } from "react";
import { http } from "../services/http";

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)


export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const isAuthenticated = false

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await http.post('/sessions', {
        email,
        password
      })

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)