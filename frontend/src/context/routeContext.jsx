import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export const RouteContext = createContext({
  currentPath: null,
  previousPath: null,
})

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState({ currentPath: null, previousPath: null })
  const location = useLocation()

  useEffect(() => {
    setRoute((prev) => ({ ...prev, currentPath: location.pathname }))
  }, [location])

  const updatePreviousPath = () => {
    setRoute((prev) => ({ ...prev, previousPath: prev.currentPath }))
  }

  useEffect(() => {
    updatePreviousPath()
  }, [])

  return (
    <RouteContext.Provider value={{ ...route, updatePreviousPath }}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContext
