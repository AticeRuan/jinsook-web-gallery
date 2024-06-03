import { useState } from 'react'
import { useArtworksContext } from './useArtworksContext'
import { useAuthContext } from './useAuthContext'

const useCreate = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useArtworksContext()
  const { user } = useAuthContext()
  const apiUrl = import.meta.env.VITE_API_URL

  const createData = async (newData) => {
    setLoading(true)
    setError(null)

    if (!user) {
      setError(new Error('User is not authenticated'))
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${apiUrl}/api/artworks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const createdData = await response.json()

      // Update the context with the new data
      dispatch({ type: 'CREATE_ARTWORK', payload: createdData })

      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { createData, loading, error }
}

export default useCreate
