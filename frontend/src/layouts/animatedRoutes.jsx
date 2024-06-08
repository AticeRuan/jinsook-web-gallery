import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
//import pages
import Home from '../pages/home'
import About from '../pages/about'
import Contact from '../pages/contact'
import Dashboard from '../pages/dashboard'
import SingleCategory from '../pages/singleCategory'
import SingleArtwork from '../pages/singleArtwork'
import Artworks from '../pages/artworks'
import Layout from './layout'
import AllArtworks from '../pages/allArtworks'
import AllArtworksByTheme from '../pages/allArtworksByTheme'
import NotFound from '../pages/notFound'

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/artworks/:category" element={<SingleCategory />} />
          <Route path="/artworks/:category/:id" element={<SingleArtwork />} />
          <Route path="/artworks/all" element={<AllArtworks />} />
          <Route path="/artworks/themes" element={<AllArtworksByTheme />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
