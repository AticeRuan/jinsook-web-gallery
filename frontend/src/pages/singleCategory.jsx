import { useParams } from 'react-router-dom'
import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import Heading from '../components/ui/heading'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import usePreviousPath from '../hooks/usePreviousPath'
import { motion } from 'framer-motion'
import Refresh from '../components/ui/refresh'
const SingleCategory = () => {
  const { category } = useParams()
  const previousPath = usePreviousPath()
  const categoryname = (category) => {
    if (category === 'childrens-books') return "Children's Books"
    else return category
  }
  const { data: artworks, loading, error } = useRead(`artworks/${category}`)

  const themes = [...new Set(artworks?.map((artwork) => artwork.theme))]
  const handcrafts = artworks?.filter(
    (artwork) => artwork.category === 'handcrafts',
  )
  const handcraftsTitles = [
    ...new Set(handcrafts?.map((artwork) => artwork.title)),
  ]
  const handcraftsThemes = [
    ...new Set(handcrafts?.map((artwork) => artwork.theme)),
  ]
  const filteredHandcraftsThemes = handcraftsThemes.filter(
    (theme) => theme !== '',
  )
  const isHandcrafts = category === 'handcrafts'

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
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)]  flex  items-center justify-center relative z-10">
        <Loader />
      </div>
    )

  if (error)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)]  flex items-center justify-center relative z-10 flex-col">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.div
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative"
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
          heading={categoryname(category)}
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
        />
      </motion.div>
      <motion.div
        className="rounded-xl bg-white h-fit  p-10 flex flex-col items-center justify-center gap-10 mt-10  w-auto md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="">
          {isHandcrafts
            ? filteredHandcraftsThemes.map((theme, index) => (
                <motion.div
                  key={index}
                  className="text-center border-gray-200 py-5"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <Heading text={theme} color={getBackgroundColor()} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {handcraftsTitles.map((title) => {
                      const artworks = handcrafts.filter(
                        (artwork) =>
                          artwork.title === title && artwork.theme === theme,
                      )

                      const firstItem = artworks.length > 0 ? artworks[0] : null
                      return (
                        firstItem && (
                          <ProductItem
                            item={firstItem}
                            key={firstItem._id}
                            previousPath={previousPath}
                          />
                        )
                      )
                    })}
                  </div>
                </motion.div>
              ))
            : themes.map((theme) => (
                <motion.div
                  key={theme}
                  className="text-center border-gray-200 py-5"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <Heading text={theme} color={getBackgroundColor()} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {artworks
                      .filter((artwork) => artwork.theme === theme)
                      .map((artwork) => (
                        <ProductItem
                          item={artwork}
                          key={artwork._id}
                          previousPath={previousPath}
                        />
                      ))}
                  </div>
                </motion.div>
              ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SingleCategory
