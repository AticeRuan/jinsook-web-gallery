import { useState } from 'react'
import { useArtworksContext } from './useArtworksContext'
import { useAuthContext } from './useAuthContext'

const useDelete = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useArtworksContext()
  const { user } = useAuthContext()
  const apiUrl = import.meta.env.VITE_API_URL

  const deleteData = async (endpoint) => {
    setLoading(true)
    setError(null)

    if (!user) {
      setError(new Error('User is not authenticated'))
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const deletedData = await response.json()

      // Update the context to remove the deleted item
      dispatch({ type: 'DELETE_ARTWORK', payload: deletedData })

      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { deleteData, loading, error }
}

export default useDelete
