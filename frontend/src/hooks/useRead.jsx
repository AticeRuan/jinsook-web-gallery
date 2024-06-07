import { useState, useEffect } from 'react'
import { useArtworksContext } from './useArtworksContext'
import { useMessagesContext } from './useMessageContext'
import { useAuthContext } from './useAuthContext'

const useRead = (endpoint) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const { dispatch: artworksDispatch } = useArtworksContext()
  const { dispatch: messagesDispatch } = useMessagesContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      let response
      try {
        if (!user) {
          response = await fetch(`${apiUrl}/api/${endpoint}`)
        } else {
          response = await fetch(`${apiUrl}/api/${endpoint}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
        }

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const fetchedData = await response.json()

        if (endpoint === 'messages') {
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
  }, [endpoint, apiUrl, artworksDispatch, messagesDispatch, user])

  return { data, loading, error }
}

export default useRead
