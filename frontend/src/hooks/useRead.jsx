import { useState, useEffect } from 'react'
import { useArtworksContext } from './useArtworksContext'

const useRead = (endpoint) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const { dispatch } = useArtworksContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}${endpoint}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const fetchedData = await response.json()
        dispatch({ type: 'SET_ARTWORKS', payload: fetchedData })
        setData(fetchedData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, apiUrl, dispatch])

  return { data, loading, error }
}

export default useRead
