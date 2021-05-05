import { createContext, ReactNode, useContext } from "react";

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
    console.log({ email, password })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)