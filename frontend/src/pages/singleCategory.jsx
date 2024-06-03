import { useParams } from 'react-router-dom'

const SingleCategory = () => {
  const { category } = useParams()
  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)]">
      {category}
    </div>
  )
}

export default SingleCategory
