import { createContext, useReducer, useEffect, useState } from 'react'
import { authReducer } from '../reducer/authReducer'
const AuthContext = createContext()
const isTokenExpired = (token) => {
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000

    return payload.exp < currentTime
  } catch (error) {
    console.error('Error parsing token:', error)
    return true
  }
}
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user ? user.token : null

    const checkAuth = () => {
      if (isTokenExpired(token)) {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('user')
      } else {
        setIsExpired(false)
      }
    }

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }

    checkAuth()
    const intervalId = setInterval(checkAuth, 60000) // Check every 60 seconds

    return () => clearInterval(intervalId)
  }, [isExpired])

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isExpired }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
