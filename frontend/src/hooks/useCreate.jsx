import { useState } from 'react'
import { useArtworksContext } from './useArtworksContext'
import { useAuthContext } from './useAuthContext'
import { useMessagesContext } from './useMessageContext'

const useCreate = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useArtworksContext()
  const { dispatch: messageDispatch } = useMessagesContext()
  const { user } = useAuthContext()

  const apiUrl = import.meta.env.VITE_API_URL

  const createData = async (endpoint, newData) => {
    setLoading(true)
    setError(null)
    let response

    if (!user) {
      setError(new Error('User is not authenticated'))
      setLoading(false)
      return
    }

    try {
      if (endpoint === 'messages') {
        response = await fetch(`${apiUrl}/api/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        })
      } else {
        response = await fetch(`${apiUrl}/api/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(newData),
        })
      }

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const createdData = await response.json()

      if (endpoint === 'messages') {
        messageDispatch({ type: 'CREATE_MESSAGE', payload: createdData })
      } else {
        dispatch({ type: 'CREATE_ARTWORK', payload: createdData })
      }

      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { createData, loading, error }
}

export default useCreate
