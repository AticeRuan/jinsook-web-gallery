import { useParams } from 'react-router-dom'

const SingleArtwork = () => {
  const { category, id } = useParams()
  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[px] md:pt-[150px] flex flex-col items-center">
      {category}:{id}
    </div>
  )
}

export default SingleArtwork
