import { useState, useEffect } from 'react'
import { useArtworksContext } from './useArtworksContext'
import { useMessagesContext } from './useMessageContext'
const useRead = (endpoint) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const { dispatch: artworksDispatch } = useArtworksContext()
  const { dispatch: messagesDispatch } = useMessagesContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}${endpoint}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const fetchedData = await response.json()

        if (endpoint.includes('messages')) {
          messagesDispatch({ type: 'SET_MESSAGES', payload: fetchedData })
        } else {
          artworksDispatch({ type: 'SET_ARTWORKS', payload: fetchedData })
        }

        setData(fetchedData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, apiUrl, artworksDispatch, messagesDispatch])

  return { data, loading, error }
}

export default useRead
