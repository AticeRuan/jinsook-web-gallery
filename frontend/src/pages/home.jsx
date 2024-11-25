import PageTitle from '../components/ui/pageTitle'
import Heading from '../components/ui/heading'
import intro01 from '../assets/intro-01.png'
import intro02 from '../assets/intro-02.png'
import intro03 from '../assets/intro-03.png'
import IntroComponent from '../components/home/introComponent'
import ProductItem from '../components/ui/productItem'
import useRead from '../hooks/useRead'
import Loader from '../components/ui/loader'

import usePreviousPath from '../hooks/usePreviousPath'
import { motion } from 'framer-motion'
import Refresh from '../components/ui/refresh'

const Home = () => {
  const { data: artworks, loading, error } = useRead('artworks')

  const previousPath = usePreviousPath()

  const featuredArtworks = Array.isArray(artworks)
    ? artworks.filter((artwork) => artwork.featured === true)
    : []

  if (loading)
    return (
      <motion.div
        className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Loader />
      </motion.div>
    )
  if (error)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center flex-col font-bold">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.section
      className="max-w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="mt-20  flex items-center justify-start flex-col "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PageTitle
          heading="Jinsook Taylor"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus."
        />
      </motion.div>
      {/* owner's title section */}
      <div>
        <motion.div
          className="mt-20 flex flex-col justify-start"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <Heading text="Artistry & Storytelling" />
          <div className="bg-white rounded-lg flex items-center justify-center md:gap-20 gap-10 flex-col md:flex-row mt-10 px-10 py-28 w-[80vw] md:w-auto">
            <IntroComponent
              imgUrl={intro01}
              heading="Hand-drawn Artworks"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim"
            />
            <IntroComponent
              imgUrl={intro02}
              heading="Crafts"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim"
            />
            <IntroComponent
              imgUrl={intro03}
              heading="Children's Books"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim"
            />
          </div>
        </motion.div>
      </div>
      {/* feature products */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Heading text="Featured Artworks" />
        <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 p-16 sm:p-20 w-auto md:p-10 gap-8 md:gap-20 place-content-center">
          {featuredArtworks.map((artwork) => (
            <ProductItem
              item={artwork}
              key={artwork._id}
              forFeatured={true}
              previousPath={previousPath}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Home
