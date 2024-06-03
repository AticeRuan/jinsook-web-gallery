import { ArtworksContext } from '../context/artworksContext'
import { useContext } from 'react'

export const useArtworksContext = () => {
  const context = useContext(ArtworksContext)
  if (!context) {
    throw new Error(
      'useArtworksContex must be used within a ArtworksContextProvider',
    )
  }
  return context
}
