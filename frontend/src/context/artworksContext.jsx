// src/context/ArtworksContext.js
import { createContext, useReducer } from 'react'
import { artworksReducer } from '../reducer/artworkReducer'
export const ArtworksContext = createContext()

export const ArtworksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(artworksReducer, {
    artworks: null,
  })

  return (
    <ArtworksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArtworksContext.Provider>
  )
}
