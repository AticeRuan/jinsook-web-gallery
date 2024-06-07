import { Link, useLocation, useParams } from 'react-router-dom'
import logo from '../assets/logo_black&transparent.png'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

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
    setHoveredLink(index)
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

  const containerStyle = {
    transition: 'all 1s ease',
    backgroundColor: scrolled ? 'rbga(255,255,255,1)' : 'none',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
  }
  return (
    <nav
      className="font-heading font-bold text-[1.5rem] fixed top-0 w-screen md:h-[150px] flex items-center justify-center z-50 pr-10 xl:pr-0"
      style={containerStyle}
    >
      {/* large screen menu */}
      <div className="md:flex items-center justify-between hidden w-full xl:w-[1000px]">
        {/* logo */}
        <Link className="w-[100px] ml-10" to="/">
          <img src={logo} width={178} height={161} />
        </Link>
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
                className="transition-colors duration-200 ease-in-out text-lg lg:text-[1.5rem]"
              >
                <div className="flex gap-2 group items-center">
                  {link.name}
                  {link.sublinks && (
                    <p
                      className="font-body scale-x-150 transition-transform duration-50 ease-in-out"
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
            className={`fixed w-screen h-screen ${getBackgroundColor()}   flex flex-col items-center justify-start gap-8 top-0 left-0 pt-[50%] `}
            variants={listVariants}
            initial="closed"
            animate="open"
          >
            {links.map((link) => (
              <motion.div key={link.url} variants={listItemVariants}>
                <div
                  className="font-body text-4xl"
                  style={{ color: getForegroundColor() }}
                >
                  <div className="flex gap-3 group">
                    {link.sublinks && (
                      <button
                        className="font-body rotate-180 scale-x-[180%] text-[1.5rem] transition-transform duration-50 ease-in-out"
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
                    >
                      {link.name}
                    </Link>
                  </div>
                  {link.sublinks && sublinksOpen && (
                    <motion.div
                      className="flex flex-col items-start p-5 gap-2"
                      variants={listItemVariants}
                    >
                      {link.sublinks.map((sublink, subIndex) => (
                        <Link
                          to={sublink.url}
                          key={subIndex}
                          className="font-[500] text-[1.2rem]"
                          onClick={() => setOpen((prev) => !prev)}
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
      </div>
    </nav>
  )
}

export default NavBar
