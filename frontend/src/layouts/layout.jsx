import { Outlet } from 'react-router-dom'
import NavBar from '../components/navBar'

import Footer from '../components/footer'

const Layout = () => {
  return (
    <div className=" w-screen  h-fit bg-jinsook-blue flex justify-center ">
      <NavBar />
      <div className="xl:w-[800px] w-full">
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
