import { createContext, useState, useContext, ReactNode } from 'react'

interface AuthContextProps {
  isAuthenticated: boolean
  userLogin: () => void
  userLogout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const userLogin = () => setIsAuthenticated(true)
  const userLogout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
