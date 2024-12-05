import { useContext } from 'react'
import { ContentContext } from '../context/contentContext'

export const useContentContext = () => {
  const context = useContext(ContentContext)

  if (!context) {
    throw new Error(
      'useContentContext must be used within a ContentContextProvider',
    )
  }

  return context
}
