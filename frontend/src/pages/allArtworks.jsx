import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import usePreviousPath from '../hooks/usePreviousPath'
import { useArtworksContext } from '../hooks/useArtworksContext'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Filter from '../components/svg/filter'
import Refresh from '../components/ui/refresh'

const AllArtworks = () => {
  const { loading, error } = useRead(`artworks/`)
  const previousPath = usePreviousPath()
  const { artworks } = useArtworksContext()
  const [sortedArtworkArray, setSortedArtworkArray] = useState([])
  // Combined Filter State
  const [filters, setFilters] = useState({
    categories: [],
    themes: [],
    prices: [],
    mediums: [],
  })

  useEffect(() => {
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
    const artworkToUse = combineObjects(
      artworkNotHandcrafts,
      firstHandcraftItems,
    )
    const artworkToUseArray = Object.values(artworkToUse)
    setSortedArtworkArray(
      artworkToUseArray.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      ),
    )
  }, [artworks])
  //sort data logic starts

  //sort data logic ends

  //  filter logic starts

  const [filteredData, setFilteredData] = useState(sortedArtworkArray)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [mediumOpen, setMediumOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const artworkCategories = [
    ...new Set(artworks?.map((artwork) => artwork.category.replace('-', ' '))),
  ]

  const artworkMediums = [
    ...new Set(
      artworks
        ?.filter((artwork) => artwork.medium !== '')
        .map((artwork) => artwork.medium),
    ),
  ]
  const artworkThemes = [
    ...new Set(
      artworks
        ?.filter((artwork) => artwork.theme !== '')
        .map((artwork) => artwork.theme),
    ),
  ]
  const artworkPrice = ['0-$50', '$50-$100', '$100-$300', '$300+']

  // Filter Logic
  useEffect(() => {
    const filtered = sortedArtworkArray.filter((artwork) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(artwork.category.replace(' ', '-'))
      const themeMatch =
        filters.themes.length === 0 || filters.themes.includes(artwork.theme)
      const mediumMatch =
        filters.mediums.length === 0 || filters.mediums.includes(artwork.medium)
      const priceMatch =
        filters.prices.length === 0 ||
        filters.prices.some(
          ([min, max]) => artwork.price >= min && artwork.price <= max,
        )

      return categoryMatch && themeMatch && mediumMatch && priceMatch
    })
    setFilteredData(filtered)
  }, [filters, sortedArtworkArray])

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: checked
        ? [...prevFilters.categories, value.replace(' ', '-')]
        : prevFilters.categories.filter(
            (category) => category !== value.replace(' ', '-'),
          ),
    }))
  }

  const filterStyle = {
    height: filterOpen ? 'fit-content' : '0',
    transition: 'height 2s ease-in-out',
  }

  const handleThemeChange = (event) => {
    const { name, checked } = event.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      themes: checked
        ? [...prevFilters.themes, name]
        : prevFilters.themes.filter((theme) => theme !== name),
    }))
  }

  // Handler for medium filter changes
  const handleMediumChange = (event) => {
    const { value, checked } = event.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      mediums: checked
        ? [...prevFilters.mediums, value]
        : prevFilters.mediums.filter((medium) => medium !== value),
    }))
  }
  const priceRanges = {
    '0-$50': [0, 50],
    '$50-$100': [50, 100],
    '$100-$300': [100, 300],
    '$300+': [300, Infinity],
  }
  const handlePriceChange = (event) => {
    const { value, checked } = event.target
    const range = priceRanges[value]
    setFilters((prevFilters) => ({
      ...prevFilters,
      prices: checked
        ? [...prevFilters.prices, range]
        : prevFilters.prices.filter(
            (r) => !(r[0] === range[0] && r[1] === range[1]),
          ),
    }))
  }
  const handleReset = () => {
    setFilters({
      categories: [],
      themes: [],
      prices: [],
      mediums: [],
    })
    setFilteredData(sortedArtworkArray)
  }

  if (loading)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative justify-center">
        <Loader />
      </div>
    )

  if (error)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative justify-center">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.div
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative flex-col"
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
        className="rounded-xl bg-white h-fit  p-10 w-[90%] xl:w-full flex flex-col md:flex-row md:items-start md:justify-center items-center sm:gap-10 mt-10  md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {/* filter block */}
        <motion.div className="w-[25%] md:flex md:border-r-2 border-jinsook-blue md:py-10 md:mt-3 gap-10 text-sm hidden flex-col md:items-start h-full items-center pr-3">
          <div className="flex md:flex-col gap-10 ">
            {' '}
            {/* catogery */}
            <div className="font-body flex flex-col gap-2 md:gap-3 text-xs md:text-sm">
              <h2 className="text-[1rem] font-[500]">Category</h2>
              {artworkCategories.map((category) => (
                <label key={category} className="flex gap-1 capitalize">
                  <input
                    type="checkbox"
                    id={category}
                    name={category.replace(' ', '-')}
                    value={category.replace(' ', '-')}
                    checked={filters.categories.includes(
                      category.replace(' ', '-'),
                    )}
                    onChange={handleCategoryChange}
                  />
                  {category}
                </label>
              ))}
            </div>
            {/* Theme */}
            <div className="font-body flex flex-col md:gap-3 text-xs md:text-sm gap-2">
              <h2 className="text-[1rem] font-[500]">Theme</h2>
              {artworkThemes.map((theme) => (
                <label key={theme} className="flex gap-1 capitalize">
                  <input
                    type="checkbox"
                    id={theme}
                    name={theme}
                    value={theme}
                    checked={filters.themes.includes(theme)}
                    onChange={handleThemeChange}
                  />
                  {theme}
                </label>
              ))}
            </div>
            {/* price */}
            <div className="font-body flex flex-col md:gap-3 text-xs md:text-sm gap-2">
              <h2 className="text-[1rem] font-[500]">Price</h2>
              {artworkPrice.map((price) => (
                <label key={price} className="flex gap-1 capitalize">
                  <input
                    type="checkbox"
                    id={price}
                    name={price}
                    value={price}
                    onChange={handlePriceChange}
                    checked={filters.prices.some(
                      (range) =>
                        range[0] === priceRanges[price][0] &&
                        range[1] === priceRanges[price][1],
                    )}
                  />
                  {price}
                </label>
              ))}
            </div>
            {/* Medium */}
            <div className="font-body flex flex-col md:gap-3 text-xs md:text-sm gap-2">
              <h2 className="text-[1rem] font-[500]">Medium</h2>
              {artworkMediums
                .filter((medium) => medium !== '')
                .map((medium, index) => (
                  <label key={index} className="flex gap-1 capitalize">
                    <input
                      type="checkbox"
                      id={medium}
                      name={medium}
                      value={medium}
                      checked={filters.mediums.includes(medium)}
                      onChange={handleMediumChange}
                    />
                    {medium}
                  </label>
                ))}
            </div>{' '}
          </div>
          <button
            className="uppercase border-2 border-jinsook-green rounded-3xl p-2 hover:text-white text-jinsook-green hover:bg-jinsook-green transition-all
          duration-300 ease-in-out min-w-[70px]"
            onClick={handleReset}
          >
            reset
          </button>
        </motion.div>
        {/* filter ends */}
        {/* filter block mobile filter */}
        <div className="flex flex-col md:hidden items-center w-full gap-2">
          <div className="flex items-center gap-2 w-full justify-center">
            <p className="font-body text-sm uppercase ">filter</p>
            <button
              className="w-[15px]"
              onClick={() => {
                setFilterOpen(!filterOpen)
                handleReset()
                if (filterOpen) {
                  setCategoryOpen(false)
                  setThemeOpen(false)
                  setPriceOpen(false)
                  setMediumOpen(false)
                }
              }}
            >
              <Filter />
            </button>
          </div>

          <motion.div
            className="md:w-[20%] flex md:border-r-2 border-jinsook-blue md:py-10 md:mt-3 gap-2 text-sm flex-col md:items-start h-full items-start overflow-hidden transition-all duration-500 ease-in-out px-10 "
            style={filterStyle}
          >
            <div className="flex flex-col gap-1  ">
              {' '}
              {/* catogery */}
              <div className="font-body flex flex-col  md:gap-3 text-xs md:text-[1rem]">
                <div className="flex gap-2 items-center justify-start">
                  <h2 className="text-sm font-[500]">Category</h2>
                  <button
                    className="text-lg bold text-[#74cfbb]"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                  >
                    +
                  </button>
                </div>
                {categoryOpen && (
                  <div className="flex flex-col items-start gap-1">
                    {artworkCategories.map((category) => (
                      <label
                        key={category}
                        className="flex gap-1 capitalize items-center"
                      >
                        <input
                          type="checkbox"
                          id={category}
                          name={category.replace(' ', '-')}
                          value={category.replace(' ', '-')}
                          checked={filters.categories.includes(
                            category.replace(' ', '-'),
                          )}
                          onChange={handleCategoryChange}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Theme */}
              <div className="font-body flex flex-col md:gap-3 text-xs ">
                <div className="flex gap-2 items-center justify-start">
                  <h2 className="text-sm font-[500] ">Theme</h2>
                  <button
                    className="text-lg bold text-[#74cfbb]"
                    onClick={() => setThemeOpen(!themeOpen)}
                  >
                    +
                  </button>
                </div>
                {themeOpen && (
                  <div className="flex flex-col items-start gap-1">
                    {artworkThemes.map((theme) => (
                      <label key={theme} className="flex gap-1 capitalize">
                        <input
                          type="checkbox"
                          id={theme}
                          name={theme}
                          value={theme}
                          checked={filters.themes.includes(theme)}
                          onChange={handleThemeChange}
                        />
                        {theme}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* price */}
              <div className="font-body flex flex-col md:gap-3 text-xs ">
                <div className="flex gap-2 items-center justify-start">
                  <h2 className="text-sm font-[500]">Price</h2>
                  <button
                    className="text-lg bold text-[#74cfbb]"
                    onClick={() => setPriceOpen(!priceOpen)}
                  >
                    +
                  </button>
                </div>
                {priceOpen && (
                  <div className="flex flex-col items-start gap-1">
                    {artworkPrice.map((price) => (
                      <label key={price} className="flex gap-1 capitalize">
                        <input
                          type="checkbox"
                          id={price}
                          name={price}
                          value={price}
                          onChange={handlePriceChange}
                          checked={filters.prices.some(
                            (range) =>
                              range[0] === priceRanges[price][0] &&
                              range[1] === priceRanges[price][1],
                          )}
                        />
                        {price}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Medium */}
              <div className="font-body flex flex-col md:gap-3 text-xs">
                <div className="flex gap-2 items-center justify-start">
                  <h2 className="text-sm font-[500]">Medium</h2>
                  <button
                    className="text-lg bold text-[#74cfbb]"
                    onClick={() => setMediumOpen(!mediumOpen)}
                  >
                    +
                  </button>
                </div>
                {mediumOpen && (
                  <div className="flex flex-col items-start gap-1">
                    {artworkMediums
                      .filter((medium) => medium !== '')
                      .map((medium, index) => (
                        <label key={index} className="flex gap-1 capitalize">
                          <input
                            type="checkbox"
                            id={medium}
                            name={medium}
                            value={medium}
                            checked={filters.mediums.includes(medium)}
                            onChange={handleMediumChange}
                          />
                          {medium}
                        </label>
                      ))}
                  </div>
                )}
              </div>{' '}
            </div>
            <button
              className="uppercase border-2 border-jinsook-green rounded-3xl p-1 hover:text-white text-jinsook-green hover:bg-jinsook-green transition-all
          duration-300 ease-in-out w-[50px] text-xs"
              onClick={handleReset}
            >
              reset
            </button>
          </motion.div>
        </div>
        {/* filter ends */}
        <div>
          {filteredData.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10  p-16 sm:p-5 "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {filteredData.map((artwork) => (
                <ProductItem
                  item={artwork}
                  key={artwork._id}
                  previousPath={previousPath}
                />
              ))}
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-body">
              Opps, No Artwork Found
            </div>
          )}
          {/* {Array.isArray(firstHandcraftItemsArray) &&
            firstHandcraftItemsArray.map((artwork) => (
              <ProductItem item={artwork} key={artwork._id} />
            ))} */}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AllArtworks
