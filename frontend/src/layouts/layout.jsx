import { Outlet, useLocation, useParams } from 'react-router-dom'
import NavBar from '../components/navBar'

import Footer from '../components/footer'

const Layout = () => {
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
    } else if (path.startsWith('/artworks/') && category == 'paintings') {
      return 'bg-jinsook-light-pink'
    } else if (path.startsWith('/artworks/') && category == 'childrens-books') {
      return 'bg-jinsook-green'
    } else if (path.startsWith('/artworks/') && category == 'illustrations') {
      return 'bg-jinsook-dark-pink'
    } else if (path.startsWith('/artworks/') && category == 'handcrafts') {
      return 'bg-jinsook-blue'
    } else {
      return 'bg-jinsook-blue'
    }
  }
  return (
    <div
      className={`w-screen h-fit ${getBackgroundColor()} flex justify-center`}
    >
      <NavBar />
      <div className="xl:w-[800px] w-full">
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
