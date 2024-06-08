import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import Heading from '../components/ui/heading'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import usePreviousPath from '../hooks/usePreviousPath'
const AllArtworksByTheme = () => {
  const { data: artworks, loading, error } = useRead(`artworks`)
  const previousPath = usePreviousPath()
  const artworkNotHandcrafts = artworks?.filter(
    (artwork) => artwork.category !== 'handcrafts',
  )
  const handcrafts = artworks?.filter(
    (artwork) => artwork.category === 'handcrafts',
  )
  const themes = [
    ...new Set(artworkNotHandcrafts?.map((artwork) => artwork.theme)),
  ]
  const handcraftThemes = [
    ...new Set(handcrafts?.map((artwork) => artwork.theme)),
  ].filter((theme) => theme !== '')

  const handcraftsTitles = [
    ...new Set(handcrafts?.map((artwork) => artwork.title)),
  ]

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
    <div className="max-w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative">
      <div className="text-start w-full mt-10">
        <PageTitle
          heading="All Themes"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
        />
      </div>
      <div className="rounded-xl bg-white h-fit  p-10 w-[90%] flex flex-col items-center justify-center gap-10 mt-10  md:p-10">
        {themes.map((theme) => (
          <div key={theme} className="text-center border-gray-200 py-5">
            <Heading text={theme} color="#CDE7E3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full">
              {artworkNotHandcrafts
                .filter((artwork) => artwork.theme === theme)
                .map((artwork) => (
                  <ProductItem
                    item={artwork}
                    key={artwork._id}
                    previousPath={previousPath}
                  />
                ))}
            </div>
          </div>
        ))}
        {handcraftThemes.map((theme, index) => (
          <div key={index} className="text-center border-gray-200 py-5">
            <Heading text={theme} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
              {handcraftsTitles.map((title) => {
                const artworks = handcrafts.filter(
                  (artwork) =>
                    artwork.title === title && artwork.theme === theme,
                )

                const firstItem = artworks.length > 0 ? artworks[0] : null
                return (
                  firstItem && (
                    <ProductItem item={firstItem} key={firstItem._id} />
                  )
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllArtworksByTheme
