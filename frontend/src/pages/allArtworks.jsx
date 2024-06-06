import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
const AllArtworks = () => {
  const { data: artworks, loading, error } = useRead(`/api/artworks/`)

  if (loading)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative justify-center">
        <Loader />
      </div>
    )

  if (error)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative justify-center">
        Error: {error.message}
      </div>
    )

  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative">
      <div className="text-start w-full mt-10">
        <PageTitle
          heading="All Artworks"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
        />
      </div>
      <div className="rounded-xl bg-white h-fit  p-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 mt-10 p-16 w-auto md:p-10">
          {artworks.map((artwork) => (
            <ProductItem item={artwork} key={artwork._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllArtworks
