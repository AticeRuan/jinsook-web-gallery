import { useContext } from 'react'
import { RouteContext } from '../context/routeContext'

export const useRouteContext = () => {
  const context = useContext(RouteContext)
  if (!context) {
    throw new Error(
      'useRouteContext must be used within a RouteContextProvider',
    )
  }
  return context
}
