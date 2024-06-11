import { Outlet, useLocation, useParams } from 'react-router-dom'
import NavBar from '../components/navBar'
import Footer from '../components/footer'
import AdminTag from '../components/ui/adminTag'
import { useAuthContext } from '../hooks/useAuthContext'
// import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useArtworksContext } from '../hooks/useArtworksContext'

const Layout = () => {
  const location = useLocation()
  const { id } = useParams()
  // const previousPath = location.state?.previousPath
  const currentPath = location.pathname
  const { artworks } = useArtworksContext()

  const getArtworkName = () => {
    if (id && Array.isArray(artworks)) {
      const artwork = artworks.find((artwork) => artwork._id === id)
      return artwork ? artwork.title : 'Artwork not found'
    }
  }

  // const [previousPathToUse, setPreviousPathToUse] = useState('')
  // const [currentPathToUse, setCurrentPathToUse] = useState('')

  // useEffect(() => {
  //   setPreviousPathToUse(previousPath)
  //   setCurrentPathToUse(currentPath)
  // }, [previousPath, currentPath])

  const { user } = useAuthContext()

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
  const getCircleColor = () => {
    if (currentPath === '/') {
      return 'bg-jinsook-dark-pink'
    } else if (currentPath === '/about') {
      return 'bg-white'
    } else if (currentPath === '/contact') {
      return 'bg-jinsook-blue'
    } else if (currentPath === '/artworks') {
      return 'bg-jinsook-green'
    } else if (currentPath === '/dashboard') {
      return 'bg-jinsook-green'
    } else if (
      currentPath.startsWith('/artworks/') &&
      category == 'paintings'
    ) {
      return 'bg-jinsook-blue'
    } else if (
      currentPath.startsWith('/artworks/') &&
      category == 'childrens-books'
    ) {
      return 'bg-jinsook-light-pink'
    } else if (
      currentPath.startsWith('/artworks/') &&
      category == 'illustrations'
    ) {
      return 'bg-jinsook-blue'
    } else if (
      currentPath.startsWith('/artworks/') &&
      category == 'handcrafts'
    ) {
      return 'bg-jinsook-yellow'
    } else {
      return 'bg-jinsook-light-pink'
    }
  }

  const setBreadcrumb = () => {
    if (currentPath === '/') {
      return 'home'
    } else if (currentPath === '/about') {
      return (
        <div className="flex gap-1">
          <Link to="/">home /</Link>
          <p>about jinsook</p>
        </div>
      )
    } else if (currentPath === '/contact') {
      return (
        <div className="flex gap-1">
          <Link to="/">home /</Link>
          <p>contact</p>
        </div>
      )
    } else if (currentPath === '/artworks') {
      return (
        <div className="flex gap-1">
          <Link to="/">home /</Link>
          <p>all categories</p>
        </div>
      )
    } else if (currentPath.endsWith(id)) {
      return (
        <div className="flex gap-1">
          <Link to="/">home /</Link>
          <Link to="/artworks">artworks /</Link>
          <Link to={`/artworks/${category}`}>{category} /</Link>
          {getArtworkName(id)}
        </div>
      )
    } else if (currentPath.includes(category)) {
      return (
        <div className="flex gap-1">
          {' '}
          <Link to="/">home /</Link>
          <Link to="/artworks">artworks /</Link>
          <p>{category}</p>
        </div>
      )
    } else if (currentPath.includes('all')) {
      return (
        <div className="flex gap-1">
          <Link to="/">home /</Link>
          <p>all artworks</p>
        </div>
      )
    } else if (currentPath.includes('themes')) {
      return (
        <div className="flex gap-1">
          <Link to="/">home /</Link>
          <p>all themes</p>
        </div>
      )
    }
  }

  // const getCircleOnePosition = (path) => {
  //   let style = {}
  //   if (currentPath && previousPath) {
  //     if (path === '/') {
  //       style = {
  //         top: '-20rem',
  //         right: 0,
  //         transform: 'rotate(45deg)',
  //         width: '25rem',
  //         height: '25rem',
  //       }
  //     } else if (path === '/artworks') {
  //       style = {
  //         top: '-7rem',
  //         left: '-10rem',
  //         transform: 'rotate(75deg)',
  //         width: '25rem',
  //         height: '25rem',
  //       }
  //     } else if (path === '/about') {
  //       style = {
  //         bottom: '-30rem',
  //         right: '-35rem',
  //         width: '30rem',
  //         height: '45rem',
  //       }
  //     } else if (path === '/contact') {
  //       style = {
  //         bottom: '-10rem',
  //         left: 0,
  //         transform: 'rotate(90deg)',
  //         width: '25rem',
  //         height: '25rem',
  //       }
  //     } else if (path === '/artworks/themes') {
  //       style = {
  //         top: '5rem',
  //         left: '-10rem',
  //         transform: 'rotate(90deg)',
  //         width: '42rem',
  //         height: '36rem',
  //       }
  //     } else if (path.includes(id)) {
  //       style = {
  //         top: '15rem',
  //         right: '-15rem',
  //         width: '50rem',
  //         height: '60rem',
  //         transform: 'rotate(45deg)',
  //       }
  //     } else if (path.includes('all')) {
  //       style = {
  //         top: '-40rem',
  //         left: '25rem',
  //         width: '70rem',
  //         height: '60rem',
  //         transform: 'rotate(-135deg)',
  //       }
  //     } else if (path.includes('/artworks/')) {
  //       style = {
  //         top: '-40rem',
  //         right: '-20rem',
  //         width: '70rem',
  //         height: '60rem',
  //         transform: 'rotate(-135deg)',
  //       }
  //     }
  //   }

  //   return { style }
  // }

  const getCircleOnePosition = () => {
    const path = location.pathname
    if (path === '/') {
      return '-top-[20rem] -right-0 rotate-45 w-[25rem] h-[25rem] md:w-[42rem] md:h-[36rem] '
    } else if (path === '/artworks') {
      return '-top-7 -left-[10rem] md:-left-[20rem] rotate-75 w-[25rem] h-[25rem] md:w-[42rem] md:h-[36rem]'
    } else if (path === '/about') {
      return '-bottom-[30rem] -right-[35rem] md:w-[70rem] md:h-[85rem] w-[30rem] h-[45rem] '
    } else if (path === '/contact') {
      return '-bottom-[10rem] md:-bottom-[5rem] md:-left-[10rem] rotate-90  w-[25rem] h-[25rem] md:w-[42rem] md:h-[36rem] '
    } else if (path === '/artworks/themes') {
      return '-top-[5rem] -left-[10rem] rotate-90 w-[42rem] h-[36rem] '
    } else if (path.endsWith(id)) {
      return 'top-[15rem] -right-[15rem] md:w-[50rem] md:h-[60rem] rotate-45  2xl:w-[100rem] 2xl:h-[120rem] xl:rotate-90'
    } else if (path.endsWith('all')) {
      return '-top-[40rem] left-[25rem] w-[70rem] h-[60rem] -rotate-[135deg] '
    } else if (path.startsWith('/artworks/')) {
      return '-top-[40rem] -right-[20rem] w-[70rem] h-[60rem] -rotate-[135deg] '
    }
  }
  const getCircleTwoPosition = () => {
    const path = location.pathname
    if (path === '/') {
      return '-top-30 -right-80  w-[30rem] h-[25rem] md:w-[42rem] md:h-[36rem]'
    } else if (path === '/artworks') {
      return 'top-[1rem] md:top-[5rem] left-[0rem] rotate-75 w-[25rem] h-[25rem] md:w-[42rem] md:h-[36rem]'
    } else if (path === '/about') {
      return '-bottom-[20rem] -right-[0rem] w-[30rem] h-[45rem]  lg:w-[70rem] lg:h-[85rem]'
    } else if (path === '/contact') {
      return '-bottom-[20rem] left-[10rem] md:-bottom-[20rem] md:left-[3rem] w-[42rem] h-[36rem]'
    } else if (path === '/artworks/themes') {
      return '-top-[10rem] left-[10rem] w-[42rem] h-[36rem]'
    } else if (path.endsWith(id)) {
      return '-bottom-[15rem] -left-[15rem] md:w-[50rem] md:h-[60rem] w-[30rem] h-[45rem] rotate-45 '
    } else if (path.endsWith('all')) {
      return '-top-[10rem] -left-[15rem] w-[50rem] h-[60rem] -rotate-[135deg] '
    } else if (path.startsWith('/artworks/')) {
      return 'top-[10rem] -right-[25rem] w-[40rem] h-[50rem] -rotate-[135deg] '
    }
  }
  const getCircleThreePosition = () => {
    const path = location.pathname
    if (path === '/') {
      return '-top-10 -right-20 rotate-90  w-[20rem] h-[25rem] md:w-[42rem] md:h-[36rem]'
    } else if (path === '/artworks') {
      return '-top-[20rem] md:-top-60 left-[3rem] md:left-[10rem] rotate-75  w-[42rem] h-[36rem]'
    } else if (path === '/about') {
      return 'hidden'
    } else if (path === '/contact') {
      return 'hidden'
    } else if (path === '/artworks/themes') {
      return '-top-[10rem] left-[30rem] '
    } else if (path.endsWith(id)) {
      return 'top-[3rem] left-[15rem] md:w-[50rem] md:h-[60rem] -rotate-[35deg]  2xl:w-[100rem] 2xl:h-[120rem]'
    } else if (path.endsWith('all')) {
      return 'top-[3rem] left-[15rem] w-[50rem] h-[60rem] -rotate-[35deg] '
    } else if (path.startsWith('/artworks/')) {
      return 'top-[10rem] right-[10rem] w-[42rem] h-[36rem] -rotate-[135deg] md:block hidden '
    }
  }
  const getCircleFourPosition = () => {
    const path = location.pathname
    if (path === '/') {
      return '-bottom-[20rem] -left-[20rem] rotate-90 xl:w-[42rem] lg:w-[30rem] xl:h-[42rem] lg:h-[30rem]'
    } else if (path === '/artworks') {
      return '-bottom-[30rem] -right-20 rotate-90 scale-150 xl:w-[42rem] lg:w-[30rem] xl:h-[42rem] lg:h-[30rem]'
    } else if (path === '/about') {
      return 'hidden'
    } else if (path === '/contact') {
      return 'hidden'
    } else if (path === '/artworks/themes') {
      return '-bottom-[15rem] -right-[15rem] xl:w-[42rem] lg:w-[30rem] xl:h-[42rem] lg:h-[30rem]'
    } else if (path.endsWith(id)) {
      return 'hidden'
    } else if (path.endsWith('all')) {
      return '-bottom-[40rem] -right-[20vw] w-[70rem] h-[80rem] -rotate-[90deg] '
    } else if (path.startsWith('/artworks/')) {
      return '-bottom-[30rem] -left-[25rem] w-[60rem] h-[60rem] -rotate-[135deg]  '
    } else {
      return '-bottom-[20rem] -left-[20rem] rotate-90 xl:w-[42rem] lg:w-[30rem] xl:h-[42rem] lg:h-[30rem]'
    }
  }

  return (
    <div
      className={`w-screen h-fit ${getBackgroundColor()} flex justify-center overflow-x-hidden relative`}
    >
      {user && <AdminTag />}{' '}
      <motion.span
        className={`rounded-full z-[1] fixed ${getCircleColor()} transition-all duration-500 ease-in-out ${getCircleOnePosition()}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.span
        className={` rounded-full z-[1] fixed ${getCircleColor()}  ${getCircleTwoPosition()} `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.span
        className={` rounded-full z-[1] fixed ${getCircleColor()}  ${getCircleThreePosition()} `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.span
        className={` rounded-full   z-[2] fixed   ${getCircleColor()} ${getCircleFourPosition()}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <NavBar />
      <div className="xl:w-[1000px] w-full flex flex-col items-center">
        {' '}
        {/* breadcrumbs */}
        <motion.div
          className="xl:w-[1000px] w-full mt-[90px] md:mt-[160px]  relative z-[60] pl-3 sm:px-20 xl:px-2 flex items-center -mb-[80px] md:-mb-[180px] tracking-wider font-body uppercase font-[500] text-[0.6rem] sm:text-xs whitespace-nowrap flex-wrap"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {setBreadcrumb()}
        </motion.div>
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
