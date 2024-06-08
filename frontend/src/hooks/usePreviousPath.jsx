import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const usePreviousPath = () => {
  const location = useLocation()
  const { category, id } = useParams()
  const pathName = location.pathname

  const [previousPath, setPreviousPath] = useState('')

  useEffect(() => {
    if (category === undefined) {
      setPreviousPath(pathName)
    } else {
      if (id) {
        setPreviousPath(`/artworks/${category}/${id}`)
      } else {
        setPreviousPath(`artworks/${category}`)
      }
    }
  }, [category, pathName, id])

  return previousPath
}

export default usePreviousPath
