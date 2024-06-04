import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const usePreviousPath = () => {
  const location = useLocation()
  const previousLocationRef = useRef(location)

  useEffect(() => {
    previousLocationRef.current = location
  }, [location])

  return previousLocationRef.current
}

export default usePreviousPath
