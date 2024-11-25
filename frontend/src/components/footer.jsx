import Email from './svg/email'
import Facebook from './svg/facebook'
import Instagram from './svg/instagram'
import { Link, useLocation, useParams } from 'react-router-dom'
const Footer = () => {
  const year = new Date().getFullYear()
  const location = useLocation()
  const { category } = useParams()
  const getForegroundColor = () => {
    const path = location.pathname

    if (path === '/') {
      return '#009379'
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
    } else if (path.startsWith('/artworks/') && category == 'goods') {
      return '#009379'
    } else if (path.startsWith('/artworks/') && category == 'crafts') {
      return '#CE88BA'
    } else {
      return '#CE88BA'
    }
  }
  return (
    <footer className="h-[120px] w-screen xl:w-[1000px] flex items-center justify-center py-3 relative z-10">
      <div className="flex items-center flex-col  gap-2">
        <div className="flex items-center justify-center gap-3">
          <Link className="w-[20px] md:w-[30px] hover:shadow-xl" to="#">
            <Instagram color={getForegroundColor()} />
          </Link>
          <Link className="w-[20px] md:w-[30px] hover:shadow-xl  " to="#">
            <Facebook color={getForegroundColor()} />
          </Link>
          <div className="w-[20px] md:w-[30px] hover:shadow-xl" to="#">
            <Email color={getForegroundColor()} />
          </div>
        </div>

        <div className="font-heading text-xs tracking-[0.1rem] sm:tracking-[0.2rem] font-[500] flex flex-col md:flex-row items-center justify-center">
          <p>© {year} Jinsook Taylor All Right Reserved</p>{' '}
          <span className="hidden md:block">| </span>
          <p>Powered by Chill Otters</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
