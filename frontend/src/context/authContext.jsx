import { createContext, useReducer, useEffect, useState } from 'react'
import { authReducer } from '../reducer/authReducer'
const AuthContext = createContext()
const isTokenExpired = (token) => {
  if (!token) return true
  const payload = JSON.parse(atob(token.split('.')[1]))
  const currentTime = Date.now() / 1000
  return payload.exp < currentTime
}
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  const [isExpired, setIsExpired] = useState(false)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user ? user.token : null
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }

    const checkAuth = () => {
      if (isTokenExpired(token)) {
        dispatch({ type: 'LOGOUT' })
        setIsExpired(true)
      } else {
        setIsExpired(false)
      }
    }
    checkAuth()
    const intervalId = setInterval(checkAuth, 600000) // Check every 60 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isExpired }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
