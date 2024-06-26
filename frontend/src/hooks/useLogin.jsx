import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)
    const api_url = import.meta.env.VITE_API_URL

    const response = await fetch(`${api_url}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.err)
    }

    if (response.ok) {
      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      //update the auth context
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
    }
  }

  return { login, error, isLoading }
}
