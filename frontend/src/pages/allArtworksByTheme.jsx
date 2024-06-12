import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import Heading from '../components/ui/heading'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import usePreviousPath from '../hooks/usePreviousPath'
import { motion } from 'framer-motion'
import Refresh from '../components/ui/refresh'
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
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative justify-center font-bold">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.div
      className="max-w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-start w-full mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PageTitle
          heading="All Themes"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
        />
      </motion.div>
      <motion.div
        className="rounded-xl bg-white h-fit  p-10 w-[90%] flex flex-col items-center justify-center gap-10 mt-10  md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {themes.map((theme) => (
          <motion.div
            key={theme}
            className="text-center border-gray-200 py-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Heading text={theme} color="#CDE7E3" />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {artworkNotHandcrafts
                .filter((artwork) => artwork.theme === theme)
                .map((artwork) => (
                  <ProductItem
                    item={artwork}
                    key={artwork._id}
                    previousPath={previousPath}
                  />
                ))}
            </motion.div>
          </motion.div>
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
      </motion.div>
    </motion.div>
  )
}

export default AllArtworksByTheme
