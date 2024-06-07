import CategoryCard from '../components/artworks/categoryCard'
import Heading from '../components/ui/heading'
import Loader from '../components/ui/loader'
import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import placeholder from '../assets/portrait.jpg'
const Artworks = () => {
  const { data, loading, error } = useRead('artworks')
  const headerArtworks = data?.filter((artwork) => artwork.header === true)

  const paintingHeader = headerArtworks?.filter(
    (artwork) => artwork.category === 'paintings',
  )

  const illustrationsHeader =
    headerArtworks &&
    headerArtworks.filter((artwork) => artwork.category === 'illustrations')

  const childrensBooksHeader =
    headerArtworks &&
    headerArtworks.filter((artwork) => artwork.category === 'childrens-books')

  const handcraftsHeader = headerArtworks?.filter(
    (artwork) => artwork.category === 'handcrafts',
  )

  if (loading) {
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center justify-center z-10 relative ">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center justify-center z-10 relative">
        Error: {error.message}
      </div>
    )
  }

  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative">
      <div className="text-start w-full mt-10">
        <PageTitle
          heading="Artworks"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus."
        />
      </div>
      {/* large screens */}
      <div className="lg:flex flex-col gap-20 w-full items-center justify-center hidden">
        <Heading text="Products" color="#CDE7E3" />

        <CategoryCard
          category="paintings"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            paintingHeader && paintingHeader.length > 0
              ? paintingHeader[0].imageUrl
              : placeholder
          }
        />
        <CategoryCard
          category="illustrations"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            illustrationsHeader && illustrationsHeader.length > 0
              ? illustrationsHeader[0].imageUrl
              : placeholder
          }
          isReverse={true}
        />
        <CategoryCard
          category="childrens-books"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            childrensBooksHeader && childrensBooksHeader.length > 0
              ? childrensBooksHeader[0].imageUrl
              : placeholder
          }
        />
        <CategoryCard
          category="handcrafts"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            handcraftsHeader && handcraftsHeader.length > 0
              ? handcraftsHeader[0].imageUrl
              : placeholder
          }
          isReverse={true}
        />
      </div>
      {/* small screens */}
      <div className="flex flex-col gap-20 w-full items-center justify-center lg:hidden">
        <Heading text="Products" color="#CDE7E3" />

        <CategoryCard
          category="paintings"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            paintingHeader && paintingHeader.length > 0
              ? paintingHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
        />
        <CategoryCard
          category="illustrations"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            illustrationsHeader && illustrationsHeader.length > 0
              ? illustrationsHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
        />
        <CategoryCard
          category="childrens-books"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            childrensBooksHeader && childrensBooksHeader.length > 0
              ? childrensBooksHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
        />
        <CategoryCard
          category="handcrafts"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
          imgUrl={
            handcraftsHeader && handcraftsHeader.length > 0
              ? handcraftsHeader[0].imageUrl
              : placeholder
          }
          isSmallScreen={true}
        />
      </div>
    </div>
  )
}

export default Artworks
