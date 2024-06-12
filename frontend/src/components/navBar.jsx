import { Link, useLocation, useParams } from 'react-router-dom'
import logo from '../assets/logo_black&transparent.png'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useArtworksContext } from '../hooks/useArtworksContext'
import Search from './svg/search'
import useRead from '../hooks/useRead'
import LoadingBlue from './svg/loadingBlue'
import usePreviousPath from '../hooks/usePreviousPath'

const links = [
  { name: 'Home', url: '/' },
  {
    name: 'Artworks',
    url: '/artworks',
    sublinks: [
      { name: 'All Artworks', url: '/artworks/all' },
      { name: 'All Categories', url: '/artworks' },
      { name: 'Paintings', url: '/artworks/paintings' },
      { name: 'Childrens Books', url: '/artworks/childrens-books' },
      { name: 'Illustrations', url: '/artworks/illustrations' },
      { name: 'Handcrafts', url: '/artworks/handcrafts' },
      { name: 'View By Themes', url: '/artworks/themes' },
    ],
  },
  { name: 'About Jinsook', url: '/about' },
  { name: 'Contact', url: '/contact' },
]

const listVariants = {
  closed: {
    x: '100vw',
  },
  open: {
    x: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
}

const listItemVariants = {
  closed: {
    opacity: 0,
    x: -10,
  },
  open: {
    opacity: 1,
    x: 0,
  },
}
const centreVariants = {
  closed: {
    opacity: 1,
  },
  open: {
    opacity: 0,
  },
}

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [sublinksOpen, setSublinksOpen] = useState(false)

  const location = useLocation()
  const { category } = useParams()

  const previousPath = usePreviousPath()

  const getBackgroundColor = () => {
    const path = location.pathname

    if (path === '/') {
      return 'bg-jinsook-blue'
    } else if (path === '/about') {
      return 'bg-jinsook-light-pink'
    } else if (path === '/contact') {
      return 'bg-jinsook-pink'
    } else if (path === '/artworks') {
      return 'bg-jinsook-blue'
    } else if (path === '/dashboard') {
      return 'bg-jinsook-green'
    } else if (path.startsWith('/artworks/') && category == 'paintings') {
      return 'bg-jinsook-light-pink'
    } else if (path.startsWith('/artworks/') && category == 'childrens-books') {
      return 'bg-jinsook-green'
    } else if (path.startsWith('/artworks/') && category == 'illustrations') {
      return 'bg-jinsook-dark-pink'
    } else if (path.startsWith('/artworks/') && category == 'handcrafts') {
      return 'bg-jinsook-pink'
    } else {
      return 'bg-jinsook-blue'
    }
  }

  const getForegroundColor = () => {
    const path = location.pathname

    if (path === '/') {
      return '#CE88BA'
    } else if (path === '/about') {
      return '#009379'
    } else if (path === '/contact') {
      return '#009379'
    } else if (path === '/artworks') {
      return '#CE88BA'
    } else if (path === '/dashboard') {
      return '#fff'
    } else if (path.startsWith('/artworks/') && category == 'paintings') {
      return '#FDC435'
    } else if (path.startsWith('/artworks/') && category == 'childrens-books') {
      return '#CDE7E3'
    } else if (path.startsWith('/artworks/') && category == 'illustrations') {
      return '#CDE7E3'
    } else if (path.startsWith('/artworks/') && category == 'handcrafts') {
      return '#CE88BA'
    } else {
      return '#CE88BA'
    }
  }

  // const getForegroundColorForTailwind = () => {
  //   const path = location.pathname

  //   if (path === '/') {
  //     return 'hover:text-white'
  //   } else if (path === '/about') {
  //     return 'hover:text-[#009379]'
  //   } else if (path === '/contact') {
  //     return 'hover:text-[#009379]'
  //   } else if (path === '/artworks') {
  //     return 'hover:text-[#CE88BA]'
  //   } else if (path === '/dashboard') {
  //     return 'hover:text-[#fff]'
  //   } else if (path.startsWith('/artworks/') && category == 'paintings') {
  //     return 'hover:text-[#FDC435]'
  //   } else if (path.startsWith('/artworks/') && category == 'childrens-books') {
  //     return 'hover:text-[#CDE7E3]'
  //   } else if (path.startsWith('/artworks/') && category == 'illustrations') {
  //     return 'hover:text-[#CDE7E3]'
  //   } else if (path.startsWith('/artworks/') && category == 'handcrafts') {
  //     return 'hover:text-[#CE88BA]'
  //   } else {
  //     return 'hover:text-[#CE88BA]'
  //   }
  // }
  const colour = getForegroundColor()
  const topVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 45,
      backgroundColor: colour,
    },
  }

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: -45,
      backgroundColor: colour,
    },
  }

  const handleMouseEnter = (index) => {
    if (!showSearchContent) {
      setHoveredLink(index)
    }
  }

  const handleMouseLeave = () => {
    setHoveredLink(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = document.documentElement.scrollTop > 0

      setScrolled(isScrolled)
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // search function logic start
  const { artworks } = useArtworksContext()
  const { loading } = useRead('artworks')
  const [keyword, setKeyword] = useState('')
  const [showSearchContent, setShowSearchContent] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const searchArtworks = (keyword) => {
    if (keyword === '') {
      return null
    }

    const lowerCaseKeyword = keyword.toLowerCase()

    return artworks.filter((artwork) =>
      ['theme', 'category', 'title', 'description'].some((field) =>
        String(artwork[field]).toLowerCase().includes(lowerCaseKeyword),
      ),
    )
  }

  // useEffect(() => {
  //   console.log('hasSearched', hasSearched)
  // }, [hasSearched])

  const handleSearch = () => {
    const results = searchArtworks(keyword)

    const handcrafts = results?.filter(
      (artwork) => artwork.category === 'handcrafts',
    )
    const handcraftTitles = [
      ...new Set(handcrafts?.map((artwork) => artwork.title)),
    ]

    const firstHandcraftItems = handcraftTitles?.reduce((items, title) => {
      const firstItem = artworks.find(
        (art) => art.title === title && art.category === 'handcrafts',
      )
      if (firstItem) {
        items[title] = firstItem
      }
      return items
    }, {})

    const finalResults = results
      .map((art) => {
        if (art.category === 'handcrafts' && firstHandcraftItems[art.title]) {
          return firstHandcraftItems[art.title]
        }
        return art
      })
      .filter((art, index, self) => {
        // Remove duplicate handcraft items while keeping the original structure
        if (art.category === 'handcrafts') {
          return (
            self.findIndex(
              (a) => a.title === art.title && a.category === 'handcrafts',
            ) === index
          )
        }
        return true
      })

    setSearchResults(finalResults)
    setHasSearched(true)
  }

  const handleChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleSearchButtonClick = () => {
    handleSearch()
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  const combinedBackdropFilter = () => {
    if (scrolled && showSearchContent) {
      return 'brightness(0.8) blur(8px)'
    } else if (scrolled) {
      return 'brightness(0.8) blur(8px)' // Apply filter only on scroll
    } else if (showSearchContent) {
      return 'brightness(0.8) blur(8px)' // Apply filter only for search content
    } else {
      return 'none'
    }
  }

  const containerStyle = {
    transition: 'all 1s ease',
    backgroundColor: scrolled ? 'rbga(255,255,255,1)' : 'none',
    backdropFilter: combinedBackdropFilter(),
    height: showSearchContent ? '100vh' : 'fit-content',
    justifyContent: showSearchContent ? 'flex-start' : 'center',
    WebkitBackdropFilter: combinedBackdropFilter(),
  }

  const searchBoxStyle = {
    transition: 'all 500ms ease',
    height: showSearchContent ? '35px' : '0',
    width: showSearchContent ? '300px' : '0',
  }

  const smallScreenSearchBoxStyle = {
    transition: 'all 500ms ease',
    height: showSearchContent ? '35px' : '0',
    width: showSearchContent ? '300px' : '0',
    left: scrolled ? '-13px' : '',
    transform: showSearchContent ? 'translate(0,60px)' : 'translate(0,0)',
    zIndex: showSearchContent ? '60' : '50',
  }
  const searchContentStyle = {
    transition: 'all 500ms ease',
    height: showSearchContent ? 'fit-content' : '0',
    opacity: showSearchContent ? 1 : 0,
  }

  const setMarginLeft = () => {
    if (scrolled && showSearchContent) {
      return '39px'
    } else {
      return '0'
    }
  }
  const labelStyle = {
    transition: 'all 500ms ease',
    backgroundColor: showSearchContent ? 'white' : 'transparent',
    border: showSearchContent ? '1px solid #f5dacb' : 'none',
    marginLeft: setMarginLeft(),
  }

  const largeScreenContainerRef = useRef(null)
  const smallScreenContainerRef = useRef(null)

  const handleClickOutside = (event) => {
    if (
      smallScreenContainerRef.current &&
      !smallScreenContainerRef.current.contains(event.target) &&
      largeScreenContainerRef.current &&
      !largeScreenContainerRef.current.contains(event.target)
    ) {
      setShowSearchContent(false)
      // setKeyword('');
      setSearchResults(null)
      setHasSearched(false)
      setHasSearched(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (showSearchContent === false) {
        setKeyword('')
      }
    }, 180000)
  }, [showSearchContent])

  return (
    <nav
      className="font-heading font-bold text-[1.5rem] fixed top-0 w-screen md:h-[150px] flex items-center justify-center z-[100] pr-10 xl:pr-0 flex-col md:pt-6 "
      style={containerStyle}
    >
      {/* large screen menu */}
      <div className="md:flex items-center justify-between hidden w-full xl:w-[1000px]">
        {/* logo */}
        <Link className="w-[100px] ml-10" to="/">
          <img src={logo} width={178} height={161} />
        </Link>
        {/* search bar */}
        <div
          className=" md:flex items-start w-[30px] flex-col  origin-top-left justify-start top-[70px] left-[30%] hidden "
          style={
            showSearchContent
              ? {
                  transform: 'translate(0,60px)',
                  zIndex: '60',
                  position: 'fixed',
                }
              : {}
          }
        >
          {' '}
          <label
            className="flex rounded-2xl flex-col p-2 justify-start max-h-[50vh] overflow-hidden w-[440px] "
            style={labelStyle}
            ref={largeScreenContainerRef}
          >
            <div
              className="flex cursor-pointer gap-2 px-2"
              style={showSearchContent ? { flexDirection: 'row-reverse' } : {}}
            >
              <div
                className="w-[30px] mr-2"
                onClick={
                  !showSearchContent
                    ? () => setShowSearchContent(true)
                    : handleSearchButtonClick
                }
              >
                <Search />
              </div>
              <input
                name="keyword"
                value={keyword}
                onChange={handleChange}
                className=" bg-white w-[35px] h-[30px] focus:w-[300px]    focus:border-gray-300 border-none outline-none focus:outline-none text-[1rem] font-[400] font-body  px-3 rounded-xl"
                style={searchBoxStyle}
                placeholder={
                  showSearchContent ? 'What are you looking for?' : ''
                }
                onKeyDown={handleKeyPress}
              />
            </div>
            <div
              className=" flex h-full overflow-auto w-full items-center"
              style={searchContentStyle}
            >
              <div className="m-3 flex flex-wrap w-full gap-4  h-full">
                {loading || !keyword ? (
                  <div className="flex justify-center w-full">
                    <div className="w-[20px] animate-spin flex justify-center  ">
                      <LoadingBlue />
                    </div>
                  </div>
                ) : searchResults && searchResults.length > 0 ? (
                  searchResults.map((artwork) => (
                    <Link
                      key={artwork._id}
                      className=" flex flex-col items-center gap-1 "
                      to={`/artworks/${artwork.category}/${artwork._id}`}
                      state={{ previousPath: previousPath }}
                    >
                      <div className="w-[100px] h-[100px] overflow-hidden  bg-jinsook-blue flex items-center justify-center ">
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className=" object-cover w-[200px] hover:scale-125 transform transition-all duration-1000 ease-in-out"
                        />
                      </div>
                      <p className="text-[0.8rem] font-[400] ">
                        {artwork.title}
                      </p>
                    </Link>
                  ))
                ) : hasSearched ? (
                  <div className="flex flex-col items-center font-body font-[400] text-sm gap-1">
                    {' '}
                    <p className="text-justify w-full mb-1 font-[600]">
                      No matching artworks found.
                    </p>
                    <p className="">
                      Let me know your requirements, I&apos;ll be happy to
                      create something for you.
                    </p>
                    <Link
                      to="/contact"
                      className="text-[0.7rem] font-[500] bg-jinsook-green hover:font-bold text-white rounded-full p-1 uppercase mt-2 hover:bg-white hover:text-jinsook-green hover:shadow-xl transition-all duration-300 ease-in-out border-2 border-jinsook-green"
                    >
                      Enquiry
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center w-full">
                    <div className="w-[20px] animate-spin flex justify-center  ">
                      <LoadingBlue />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </label>{' '}
        </div>{' '}
        {/* large screen links */}
        <div className="flex items-center gap-10 lg:gap-16">
          {links.map((link, index) => (
            <div
              key={link.name}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <Link
                to={link.url}
                className="transition-colors duration-200 ease-in-out text-lg lg:text-[1.5rem] "
                state={{ previousPath: previousPath }}
              >
                <div className="flex gap-2 group items-center ">
                  {link.name}
                  {link.sublinks && (
                    <p
                      className="font-body scale-x-150 transition-transform duration-50 ease-in-out "
                      style={{
                        transform:
                          hoveredLink === index
                            ? 'rotate(0) scaleX(180%)'
                            : 'rotate(180deg) scaleX(180%)',
                      }}
                    >
                      ^
                    </p>
                  )}
                </div>
              </Link>
              {link.sublinks && hoveredLink === index && (
                <div
                  className={`absolute flex flex-col items-start backdrop-blur-lg p-5 rounded-b-xl rounded-tr-xl gap-2 w-[210px] ${getBackgroundColor()} shadow-xl`}
                >
                  {link.sublinks.map((sublink, subIndex) => (
                    <Link
                      to={sublink.url}
                      key={subIndex}
                      className="font-[500] text-[1rem] lg:text-[1.2rem] font-body text-black hover:font-bold"
                      state={{ previousPath: previousPath }}
                      onClick={() => setHoveredLink(null)}
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive menu */}
      <div className="lg:hidden flex items-center justify-between">
        {/* menu list */}
        {open && (
          <motion.div
            className={`fixed w-screen h-full ${getBackgroundColor()}   flex flex-col items-center justify-start gap-8 top-0 left-0 py-[50%] overflow-y-scroll overflow-x-hidden `}
            variants={listVariants}
            initial="closed"
            animate="open"
          >
            {links.map((link) => (
              <motion.div key={link.url} variants={listItemVariants}>
                <div
                  className="font-body text-3xl"
                  style={{ color: getForegroundColor() }}
                >
                  <div className="flex gap-3 group">
                    {link.sublinks && (
                      <button
                        className="font-body rotate-180 scale-x-[180%] text-[1.5rem] transition-transform duration-50 ease-in-out "
                        onClick={() => setSublinksOpen((prev) => !prev)}
                        style={{
                          transform: sublinksOpen
                            ? 'rotate(0) scaleX(180%)'
                            : 'rotate(180deg) scaleX(180%)',
                        }}
                      >
                        ^
                      </button>
                    )}
                    <Link
                      to={link.url}
                      onClick={() => {
                        if (!link.sublinks) {
                          setOpen((prev) => !prev)
                        } else {
                          setSublinksOpen((prev) => !prev)
                        }
                      }}
                      className="whitespace-nowrap"
                      start={{ previousPath: previousPath }}
                    >
                      {link.name}
                    </Link>
                  </div>
                  {link.sublinks && sublinksOpen && (
                    <motion.div
                      className="flex flex-col items-start p-5 gap-2 "
                      variants={listItemVariants}
                    >
                      {link.sublinks.map((sublink, subIndex) => (
                        <Link
                          to={sublink.url}
                          key={subIndex}
                          className="font-[500] text-[1.2rem]"
                          onClick={() => setOpen((prev) => !prev)}
                          state={{ previousPath: previousPath }}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* hamburger */}
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 md:hidden 
           fixed top-10 right-5"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            className="w-10 h-1 rounded origin-left bg-black"
            variants={topVariants}
            animate={open ? 'open' : 'closed'}
          ></motion.div>
          <motion.div
            className="w-10 h-1 rounded bg-black"
            variants={centreVariants}
            animate={open ? 'open' : 'closed'}
          ></motion.div>
          <motion.div
            className="w-10 h-1 rounded origin-left bg-black"
            variants={bottomVariants}
            animate={open ? 'open' : 'closed'}
          ></motion.div>
        </button>
        {/* search bar */}
        {!open && (
          <div
            className=" flex items-start w-[30px] flex-col  origin-top-left justify-start top-[2.5rem] left-[5%] md:hidden fixed "
            style={smallScreenSearchBoxStyle}
          >
            {' '}
            <label
              className="flex rounded-2xl flex-col p-2 justify-start max-w-[80vw] max-h-[50vh]   "
              style={labelStyle}
              ref={smallScreenContainerRef}
            >
              <div
                className="flex cursor-pointer gap-2 px-2"
                style={
                  showSearchContent ? { flexDirection: 'row-reverse' } : {}
                }
              >
                <div
                  className=" mr-2 rounded-r-full p-1"
                  onClick={
                    !showSearchContent
                      ? () => setShowSearchContent(true)
                      : handleSearchButtonClick
                  }
                  style={{
                    backgroundColor: scrolled
                      ? 'rgba(255,255,255,0.85)'
                      : 'transparent',
                    boxShadow:
                      scrolled && !showSearchContent
                        ? '0 0 30px 0 rgba(0,0,0,0.1)'
                        : '',
                    transition: scrolled ? 'all 500ms 300ms ease' : '',
                    width: showSearchContent ? '32px' : '30px',
                    padding: showSearchContent ? '0' : '4px',
                  }}
                >
                  <Search />
                </div>
                <input
                  name="keyword"
                  value={keyword}
                  onChange={handleChange}
                  className=" bg-white w-[35px] h-[30px] focus:w-[200px]    focus:border-gray-300 border-none outline-none focus:outline-none text-[0.8rem] font-[400] font-body  px-3 rounded-xl"
                  style={searchBoxStyle}
                  placeholder={
                    showSearchContent ? 'What are you looking for?' : ''
                  }
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div
                className=" flex overflow-auto items-start"
                style={searchContentStyle}
              >
                <div className=" w-full flex items-center justify-center">
                  <div className="m-3 flex flex-wrap w-[220px] sm:w-fit gap-4 ">
                    {loading || !keyword ? (
                      <div className="flex justify-center w-full">
                        <div className="w-[20px] animate-spin flex justify-center  ">
                          <LoadingBlue />
                        </div>
                      </div>
                    ) : searchResults && searchResults.length > 0 ? (
                      searchResults.map((artwork) => (
                        <Link
                          key={artwork._id}
                          className=" flex flex-col items-center gap-1  "
                          to={`/artworks/${artwork.category}/${artwork._id}`}
                        >
                          <div className="w-[100px] h-[100px] overflow-hidden  bg-jinsook-blue flex items-center justify-center ">
                            <img
                              src={artwork.imageUrl}
                              alt={artwork.title}
                              className=" object-cover w-[200px] hover:scale-125 transform transition-all duration-1000 ease-in-out"
                            />
                          </div>
                          <p className="text-[0.8rem] font-[400] ">
                            {artwork.title}
                          </p>
                        </Link>
                      ))
                    ) : hasSearched ? (
                      <div className="flex flex-col items-center font-body font-[400] text-sm gap-1">
                        {' '}
                        <p className="text-justify w-full mb-1 font-[600]">
                          No matching artworks found.
                        </p>
                        <p className="">
                          Let me know your requirements, I&apos;ll be happy to
                          create something for you.
                        </p>
                        <Link
                          to="/contact"
                          className="text-[0.7rem] font-[500] bg-jinsook-green hover:font-bold text-white rounded-full p-1 uppercase mt-2 hover:bg-white hover:text-jinsook-green hover:shadow-xl transition-all duration-300 ease-in-out border-2 border-jinsook-green"
                        >
                          Enquiry
                        </Link>
                      </div>
                    ) : (
                      <div className="flex justify-center w-full">
                        <div className="w-[20px] animate-spin flex justify-center  ">
                          <LoadingBlue />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </label>{' '}
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
