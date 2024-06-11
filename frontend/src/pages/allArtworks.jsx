import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import usePreviousPath from '../hooks/usePreviousPath'
import { useArtworksContext } from '../hooks/useArtworksContext'
import { motion } from 'framer-motion'

const AllArtworks = () => {
  const { loading, error } = useRead(`artworks/`)
  const previousPath = usePreviousPath()
  const { artworks } = useArtworksContext()

  //sort data logic starts
  const handcrafts = artworks?.filter(
    (artwork) => artwork.category === 'handcrafts',
  )

  const handcraftTitles = [
    ...new Set(handcrafts?.map((artwork) => artwork.title)),
  ]

  const firstHandcraftItems = handcraftTitles?.reduce((acc, title) => {
    const firstItem = artworks.find(
      (art) => art.title === title && art.category === 'handcrafts',
    )
    if (firstItem) {
      acc[title] = firstItem
    }
    return acc
  }, {})

  const artworkNotHandcrafts = artworks?.filter(
    (artwork) => artwork.category !== 'handcrafts',
  )

  function combineObjects(obj1, obj2) {
    const combined = { ...obj1 }
    for (const [key, value] of Object.entries(obj2)) {
      if (combined[key]) {
        combined[key] = [].concat(combined[key], value)
      } else {
        combined[key] = value
      }
    }
    return combined
  }
  const artworkToUse = combineObjects(artworkNotHandcrafts, firstHandcraftItems)
  const artworkToUseArray = Object.values(artworkToUse)
  const sortedArtworkArray = artworkToUseArray.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  )
  //sort data logic ends

  //  filter logic starts
  // const [selectedCategories, setSelectedCategories] = useState([])
  // const [selectedThemes, setSelectedThemes] = useState([])
  // const [selectedPrices, setSelectedPrices] = useState([])
  // const [selectedMediums, setSelectedMediums] = useState([])
  // const [filteredData, setFilteredData] = useState(sortedArtworkArray)

  // const artworkCategories = [
  //   ...new Set(artworks?.map((artwork) => artwork.category.replace('-', ' '))),
  // ]

  // const artworkMediums = [
  //   ...new Set(
  //     artworks
  //       ?.filter((artwork) => artwork.medium !== '')
  //       .map((artwork) => artwork.medium),
  //   ),
  // ]
  // const artworkThemes = [
  //   ...new Set(
  //     artworks
  //       ?.filter((artwork) => artwork.theme !== '')
  //       .map((artwork) => artwork.theme),
  //   ),
  // ]
  // const artworkPrice = ['0-$50', '$50-$100', '$100-$300', '$300+']

  // const handleCategoryChange = (event) => {
  //   const { name, checked } = event.target

  //   setSelectedCategories((prev) =>
  //     checked ? [...prev, name] : prev.filter((category) => category !== name),
  //   )
  //   console.log(selectedCategories)
  // }

  // const handleThemeChange = (event) => {
  //   const { name, checked } = event.target
  //   setSelectedThemes((prev) =>
  //     checked ? [...prev, name] : prev.filter((theme) => theme !== name),
  //   )
  // }

  // const handleMediumChange = (event) => {
  //   const { name, checked } = event.target
  //   setSelectedMediums((prev) =>
  //     checked ? [...prev, name] : prev.filter((medium) => medium !== name),
  //   )
  // }

  // const handlePriceChange = (event) => {
  //   const { value, checked } = event.target
  //   let min, max

  //   switch (value) {
  //     case '0-$50':
  //       min = 0
  //       max = 50
  //       break
  //     case '$50-$100':
  //       min = 50
  //       max = 100
  //       break
  //     case '$100-$300':
  //       min = 100
  //       max = 300
  //       break
  //     case '$300+':
  //       min = 300
  //       max = Infinity
  //       break
  //     default:
  //       min = 0
  //       max = Infinity
  //   }

  //   setSelectedPrices((prev) => {
  //     if (checked) {
  //       return [...prev, [min, max]]
  //     } else {
  //       return prev.filter((range) => range[0] !== min || range[1] !== max)
  //     }
  //   })
  // }
  // const handleReset = () => {
  //   setSelectedCategories([])
  //   setSelectedThemes([])
  //   setSelectedPrices([])
  //   setSelectedMediums([])
  // }

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
          heading="All Artworks"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
        />
      </motion.div>
      <motion.div
        className="rounded-xl bg-white h-fit  p-10 w-[90%] flex flex-col items-center justify-center gap-10 mt-10  md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {/* filter block */}
        {/* <motion.div className="w-[20%] hidden md:flex border-r-2 border-jinsook-blue pt-3 mt-3 gap-10 text-sm  flex-col items-start">
          {/* catogery */}
        {/* <div className="font-body flex flex-col gap-3">
          <h2 className="text-[1rem] font-[500]">Category</h2>
          {artworkCategories.map((category) => (
            <label key={category} className="flex gap-1 capitalize">
              <input
                type="checkbox"
                id={category}
                name={category.replace(' ', '-')}
                value={category.replace(' ', '-')}
                checked={selectedCategories.includes(
                  category.replace(' ', '-'),
                )}
                onChange={handleCategoryChange}
              />
              {category}
            </label>
          ))}
        </div> */}
        {/* Theme */}
        {/* <div className="font-body flex flex-col gap-3">
          <h2 className="text-[1rem] font-[500]">Theme</h2>
          {artworkThemes.map((theme) => (
            <label key={theme} className="flex gap-1 capitalize">
              <input
                type="checkbox"
                id={theme}
                name={theme}
                value={theme}
                checked={selectedThemes.includes(theme)}
                onChange={handleThemeChange}
              />
              {theme}
            </label>
          ))}
        </div> */}
        {/* price */}
        {/* <div className="font-body flex flex-col gap-3">
          <h2 className="text-[1rem] font-[500]">Price</h2>
          {artworkPrice.map((price) => (
            <label key={price} className="flex gap-1 capitalize">
              <input
                type="checkbox"
                id={price}
                name={price}
                value={price}
                onChange={handlePriceChange}
                checked={selectedPrices.includes(price)}
              />
              {price}
            </label>
          ))}
        </div> */}
        {/* Medium */}
        {/* <div className="font-body flex flex-col gap-3">
          <h2 className="text-[1rem] font-[500]">Medium</h2>
          {artworkMediums.map((medium) => (
            <label key={medium} className="flex gap-1 capitalize">
              <input
                type="checkbox"
                id={medium}
                name={medium}
                value={medium}
                onChange={handleMediumChange}
                checked={selectedMediums.includes(medium)}
              />
              {medium}
            </label>
          ))}
        </div>{' '} */}
        {/* <button
          className="uppercase border-2 border-jinsook-green rounded-3xl p-2 hover:text-white text-jinsook-green hover:bg-jinsook-green transition-all
          duration-300 ease-in-out min-w-[70px]"
          onClick={handleReset}
        >
          reset
        </button> */}
        {/* </div> */}
        {/* filter ends */}
        <div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10  p-16 md:p-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {sortedArtworkArray.map((artwork) => (
              <ProductItem
                item={artwork}
                key={artwork._id}
                previousPath={previousPath}
              />
            ))}
            {/* {Array.isArray(firstHandcraftItemsArray) &&
            firstHandcraftItemsArray.map((artwork) => (
              <ProductItem item={artwork} key={artwork._id} />
            ))} */}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AllArtworks
