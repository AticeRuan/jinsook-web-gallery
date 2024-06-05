import { useParams } from 'react-router-dom'
import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import Heading from '../components/ui/heading'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
const SingleCategory = () => {
  const { category } = useParams()

  const categoryname = (category) => {
    if (category === 'childrens-books') return "Children's Books"
    else return category
  }
  const {
    data: artworks,
    loading,
    error,
  } = useRead(`/api/artworks/${category}`)

  const themes = [...new Set(artworks?.map((artwork) => artwork.theme))]

  const getBackgroundColor = () => {
    if (category == 'paintings') {
      return '#FDEADF'
    } else if (category == 'childrens-books') {
      return '#009379'
    } else if (category == 'illustrations') {
      return '#CE88BA'
    } else if (category == 'handcrafts') {
      return '#CDE7E3'
    } else {
      return '#CDE7E3'
    }
  }

  if (loading)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 justify-center relative z-10">
        <Loader />
      </div>
    )

  if (error)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[5px] md:pt-[150px] flex flex-col items-center gap-20 justify-center relative z-10">
        Error: {error.message}
      </div>
    )

  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[5px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative">
      <div className="text-start w-full mt-10">
        <PageTitle
          heading={categoryname(category)}
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
        />
      </div>
      <div className="rounded-xl bg-white h-fit  p-10 ">
        <div className="flex flex-col items-center justify-center gap-10">
          {themes.map((theme) => (
            <div key={theme} className="text-center border-gray-200 py-5 ">
              <Heading text={theme} color={getBackgroundColor()} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 mt-10">
                {artworks
                  .filter((artwork) => artwork.theme === theme)
                  .map((artwork) => (
                    <ProductItem item={artwork} key={artwork._id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleCategory
