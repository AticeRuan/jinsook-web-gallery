// src/context/ArtworksContext.js
import { createContext, useReducer } from 'react'
import { messageReducer } from '../reducer/messageReducer'

export const MessagesContext = createContext()

export const MessagesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    messages: null,
  })

  return (
    <MessagesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  )
}
