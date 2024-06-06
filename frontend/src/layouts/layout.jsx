import { Outlet, useLocation, useParams } from 'react-router-dom'
import NavBar from '../components/navBar'
import Footer from '../components/footer'
// import usePreviousPath from '../hooks/usePreviousPath'

const Layout = () => {
  const location = useLocation()
  const { id } = useParams()

  const currentPath = location.pathname

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
      {' '}
      <span
        className={`rounded-full z-[1] fixed ${getCircleColor()} transition-all duration-500 ease-in-out ${getCircleOnePosition()}`}
      />
      <span
        className={` rounded-full z-[1] fixed ${getCircleColor()}  ${getCircleTwoPosition()} `}
      />
      <span
        className={` rounded-full z-[1] fixed ${getCircleColor()}  ${getCircleThreePosition()} `}
      />
      <span
        className={` rounded-full   z-[2] fixed   ${getCircleColor()} ${getCircleFourPosition()}`}
      />
      <NavBar />
      <div className="xl:w-[1000px] w-full flex flex-col items-center">
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
