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
  // const getCircleOnePosition = (path) => {
  //   if (path === '/') {
  //     return {
  //       x: '-20rem',
  //       y: '-20rem',
  //       rotate: '-45deg',
  //       backgroundColor: '#CE88BA',
  //     }
  //   } else if (path === '/about') {
  //     return {
  //       x: '-30rem',
  //       y: '0',
  //       rotate: '-45deg',
  //       backgroundColor: '#009379',
  //     }
  //   } else if (path === '/artworks') {
  //     return {
  //       x: '-20rem',
  //       y: '-20rem',
  //       rotate: '-45deg',
  //       backgroundColor: '#fff',
  //     }
  //   } else
  //     return {
  //       x: '-20rem',
  //       y: '-20rem',
  //       rotate: '-45deg',
  //       backgroundColor: '#CE88BA',
  //     }
  // }

  // const previous = getCircleOnePosition(previousPath)
  // const current = getCircleOnePosition(currentPath)

  // const circleOneVariants = {
  //   previous: {
  //     x: previous.x,
  //     y: previous.y,
  //     rotate: previous.rotate,
  //   },
  //   current: {
  //     x: current.x,
  //     y: current.y,
  //     rotate: current.rotate,
  //   },
  // }
  console.log(location.pathname.endsWith(id))
  const getCircleOnePosition = () => {
    const path = location.pathname
    if (path === '/') {
      return '-top-[20rem] -right-0 rotate-45 w-[42rem] h-[36rem] '
    } else if (path === '/artworks') {
      return 'top-50 -left-[20rem] rotate-75 w-[42rem] h-[36rem] '
    } else if (path === '/about') {
      return '-bottom-[30rem] -right-[35rem] w-[70rem] h-[85rem] '
    } else if (path === '/contact') {
      return '-bottom-[5rem] -left-[10rem] rotate-90 w-[42rem] h-[36rem] '
    } else if (path === '/artworks/themes') {
      return '-top-[5rem] -left-[10rem] rotate-90 w-[42rem] h-[36rem] '
    } else if (path.endsWith(id)) {
      return 'top-[15rem] -right-[15rem] w-[50rem] h-[60rem] rotate-45  2xl:w-[100rem] 2xl:h-[120rem] xl:rotate-90'
    } else if (path.endsWith('all')) {
      return '-top-[40rem] left-[25rem] w-[70rem] h-[60rem] -rotate-[135deg] '
    } else if (path.startsWith('/artworks/')) {
      return '-top-[40rem] -right-[20rem] w-[70rem] h-[60rem] -rotate-[135deg] '
    }
  }
  const getCircleTwoPosition = () => {
    const path = location.pathname
    if (path === '/') {
      return '-top-30 -right-80 w-[42rem] h-[36rem]'
    } else if (path === '/artworks') {
      return 'top-[10rem] left-[0rem] rotate-75 w-[42rem] h-[36rem]'
    } else if (path === '/about') {
      return '-bottom-[20rem] -right-[0rem]  w-[70rem] h-[85rem]'
    } else if (path === '/contact') {
      return '-bottom-[20rem] left-[3rem] w-[42rem] h-[36rem]'
    } else if (path === '/artworks/themes') {
      return '-top-[10rem] left-[10rem] w-[42rem] h-[36rem]'
    } else if (path.endsWith(id)) {
      return '-bottom-[15rem] -left-[15rem] w-[50rem] h-[60rem]  rotate-45 '
    } else if (path.endsWith('all')) {
      return '-top-[10rem] -left-[15rem] w-[50rem] h-[60rem] -rotate-[135deg] '
    } else if (path.startsWith('/artworks/')) {
      return 'top-[10rem] -right-[25rem] w-[40rem] h-[50rem] -rotate-[135deg] '
    }
  }
  const getCircleThreePosition = () => {
    const path = location.pathname
    if (path === '/') {
      return '-top-10 -right-20 rotate-90'
    } else if (path === '/artworks') {
      return '-top-60 left-[10rem] rotate-75'
    } else if (path === '/about') {
      return 'hidden'
    } else if (path === '/contact') {
      return 'hidden'
    } else if (path === '/artworks/themes') {
      return '-top-[10rem] left-[30rem] '
    } else if (path.endsWith(id)) {
      return 'top-[3rem] left-[15rem] w-[50rem] h-[60rem] -rotate-[35deg]  2xl:w-[100rem] 2xl:h-[120rem]'
    } else if (path.endsWith('all')) {
      return 'top-[3rem] left-[15rem] w-[50rem] h-[60rem] -rotate-[35deg] '
    } else if (path.startsWith('/artworks/')) {
      return 'top-[10rem] right-[10rem] w-[42rem] h-[36rem] -rotate-[135deg] '
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
      return '-bottom-[20rem] -left-[25rem] w-[60rem] h-[60rem] -rotate-[135deg] '
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
        className={`w-[42rem] h-[40rem] rounded-full z-[1] fixed ${getCircleColor()}  ${getCircleThreePosition()} `}
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
