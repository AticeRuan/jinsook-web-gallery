import { createContext, useReducer } from 'react'
import { contentReducer } from '../reducer/contentReducer'

export const ContentContext = createContext()

export const ContentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contentReducer, {
    content: null,
  })

  return (
    <ContentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ContentContext.Provider>
  )
}
