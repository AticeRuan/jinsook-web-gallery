import { Link } from 'react-router-dom'
import logo from '../assets/logo_black&transparent.png'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
const links = [
  { name: 'Home', url: '/' },
  { name: 'Artworks', url: '/artworks' },
  { name: 'About Jinsook', url: '/about' },
  { name: 'Contact', url: '/contact' },
]
const topVariants = {
  closed: {
    rotate: 0,
  },
  open: {
    rotate: 45,
    backgroundColor: '#CDE7E3',
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

const bottomVariants = {
  closed: {
    rotate: 0,
  },
  open: {
    rotate: -45,
    backgroundColor: '#CDE7E3',
  },
}

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

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
      className="font-heading font-bold text-[1.5rem] fixed top-0 w-screen md:h-[150px] flex items-center justify-center z-50  "
      style={containerStyle}
    >
      {/* large screen menu */}
      <div className="md:flex items-center justify-between hidden w-full xl:w-[1000px]">
        {/* logo */}
        <Link className="w-[100px] ml-10" to="/">
          <img src={logo} width={178} height={161} />
        </Link>
        {/* large screen links */}
        <div className="flex items-center  ">
          {links.map((link) => (
            <Link to={link.url} key={link.name} className="pr-4 lg:pr-10">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Responsive menu */}

      <div className="lg:hidden flex items-center justify-between">
        {/* menu list */}
        {open && (
          <motion.div
            className="fixed w-screen h-screen bg-jinsook-dark-pink  flex flex-col items-center justify-center gap-8 top-0 left-0"
            variants={listVariants}
            initial="closed"
            animate="open"
          >
            {links.map((link) => (
              <motion.div key={link.url} variants={listItemVariants}>
                <Link
                  to={link.url}
                  className="text-4xl  text-jinsook-blue font-body"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {link.name}
                </Link>
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
            className="w-10 h-1 bg-black rounded origin-left "
            variants={topVariants}
            animate={open ? 'open' : 'closed'}
          ></motion.div>
          <motion.div
            className="w-10 h-1 bg-black rounded"
            variants={centreVariants}
            animate={open ? 'open' : 'closed'}
          ></motion.div>
          <motion.div
            className="w-10 h-1 bg-black rounded origin-left"
            variants={bottomVariants}
            animate={open ? 'open' : 'closed'}
          ></motion.div>
        </button>
      </div>
    </nav>
  )
}

export default NavBar
