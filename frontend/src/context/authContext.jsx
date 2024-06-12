import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducer/authReducer'
const AuthContext = createContext()
// const isTokenExpired = (token) => {
//   if (!token) return true
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]))
//     const currentTime = Date.now() / 1000

//     return payload.exp < currentTime
//   } catch (error) {
//     console.error('Error parsing token:', error)
//     return true
//   }
// }
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
