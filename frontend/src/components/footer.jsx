import Email from './svg/email'
import Facebook from './svg/facebook'
import Instagram from './svg/instagram'
import { useLocation, useParams } from 'react-router-dom'
const Footer = () => {
  const year = new Date().getFullYear()
  const location = useLocation()
  const { category } = useParams()
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
  return (
    <footer className="h-[120px] w-screen xl:w-[1000px] flex items-center justify-center py-3 relative z-10">
      <div className="flex items-center flex-col  gap-2">
        <div className="flex items-center justify-center gap-3">
          <div className="w-[20px] md:w-[30px]">
            <Instagram color={getForegroundColor()} />
          </div>
          <div className="w-[20px] md:w-[30px]">
            <Facebook color={getForegroundColor()} />
          </div>
          <div className="h-[20px] md:h-[30px]">
            <Email color={getForegroundColor()} />
          </div>
        </div>
        <p className="font-heading text-xs tracking-[0.2rem] font-[500]">
          © {year} Jinsook Taylor All Right Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
