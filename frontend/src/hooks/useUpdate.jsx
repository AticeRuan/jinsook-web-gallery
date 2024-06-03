import { useState } from 'react'
import { useArtworksContext } from './useArtworksContext'
import { useAuthContext } from './useAuthContext'
const useUpdate = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch: artworksDispatch } = useArtworksContext()
  const { user, dispatch: authDispatch } = useAuthContext()

  const apiUrl = import.meta.env.VITE_API_URL

  const updateData = async (endpoint, newData) => {
    setLoading(true)
    setError(null)

    if (!user) {
      setError(new Error('User is not authenticated'))
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const updatedData = await response.json()

      if (endpoint.includes('change-password')) {
        authDispatch({ type: 'CHANGE_PASSWORD', payload: updatedData })
      } else {
        artworksDispatch({ type: 'UPDATE_ARTWORK', payload: updatedData })
      }

      setLoading(false)
      return updatedData
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }
  return { updateData, loading, error }
}

export default useUpdate
