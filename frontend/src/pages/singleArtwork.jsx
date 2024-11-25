import { useParams, Link } from 'react-router-dom'
import useRead from '../hooks/useRead'
import PageTitle from '../components/ui/pageTitle'
import Heading from '../components/ui/heading'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import usePreviousPath from '../hooks/usePreviousPath'
import { motion } from 'framer-motion'
import Refresh from '../components/ui/refresh'

const SingleArtwork = () => {
  const { category, id } = useParams()
  const iscrafts = category === 'crafts'
  const previousPath = usePreviousPath()

  const getBackgroundColor = () => {
    if (category == 'paintings') {
      return '#FDEADF'
    } else if (category == 'childrens-books') {
      return '#009379'
    } else if (category == 'goods') {
      return '#CE88BA'
    } else if (category == 'crafts') {
      return '#CDE7E3'
    } else {
      return '#CDE7E3'
    }
  }

  function getCategoryName(category) {
    if (category === 'childrens-books') {
      return "Children's Books"
    } else {
      return trimLastLetter(category)
    }
  }

  function trimLastLetter(str) {
    if (str.length > 0) {
      return str.slice(0, -1)
    }
    return str
  }

  const {
    data: artwork,
    loading,
    error,
  } = useRead(`artworks/${category}/${id}`)

  const { data: allArtwork } = useRead('artworks')

  const artworkFromSameTheme =
    Array.isArray(allArtwork) && !loading
      ? allArtwork.filter((items) => items.theme === artwork.theme)
      : []

  const filteredartworkFromSameTheme =
    Array.isArray(artworkFromSameTheme) && !loading
      ? artworkFromSameTheme.filter((item) => item._id !== artwork._id)
      : []

  if (loading)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center">
        <Loader />
      </div>
    )
  if (error)
    return (
      <div className="w-screen xl:w-[1200px] min-h-[calc(100vh-120px)]  flex flex-col items-center justify-center z-10 relative font-bold">
        Something went wrong...
        <Refresh />
      </div>
    )

  return (
    <motion.section
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* heading */}
      <motion.div
        className="mt-10 text-left w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PageTitle heading={getCategoryName(category)} />
      </motion.div>
      {/* details */}
      <motion.div
        className="rounded-xl flex bg-white flex-col p-20 w-[90vw] lg:w-[80vw] md:w-[85vw] xl:w-full gap-12 lg:gap-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {/* items details */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-10">
          {/* Image Carousel for all product types */}
          <div className="w-full h-1/2 md:h-full md:w-3/5 lg:w-1/2 rounded-lg overflow-hidden">
            {Array.isArray(artwork.imageUrl) && artwork.imageUrl.length > 0 ? (
              <Carousel
                autoPlay={true}
                interval={3000}
                showIndicators={true}
                emulateTouch
                showStatus={false}
                centerMode
                centerSlidePercentage={100}
                infiniteLoop={true}
                showThumbs={artwork.imageUrl.length > 1}
                transitionTime={1000}
              >
                {artwork.imageUrl.map((imgUrl, index) => (
                  <div key={index} className="w-full h-full">
                    <img
                      src={imgUrl}
                      alt={`${artwork.title} - View ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p>No image available</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col items-start justify-between gap-4 max-w-[50%]">
            <h1 className="font-heading font-bold text-[1.5rem]">
              {artwork.title}
            </h1>
            <p className="font-body font-[500] text-[1.2rem]">
              {`$${artwork.price}`}
            </p>
            {
              <p className="font-heading font-[500] tracking-widest">
                Description:
              </p>
            }
            <p className="font-body font-[500] text-[0.9rem]">
              {artwork.description}
            </p>
            {!iscrafts && (
              <p className="font-heading font-[500] tracking-widest">
                <span className="font-heading font-[500] tracking-widest">
                  Theme:
                </span>
                {artwork.theme}
              </p>
            )}
            <p className="font-heading font-[500] tracking-widest">
              <span className="font-heading font-[500] tracking-widest">
                Medium:
              </span>
              {artwork.medium}
            </p>
            <p className="font-heading font-[500] tracking-widest">
              <span className="font-heading font-[500] tracking-widest">
                Dimensions:
              </span>
              {artwork.dimensions}
            </p>
            <Link
              to="/contact"
              state={{
                subject: `Hi Jinsook, I am messaging you regarding "${artwork.title}". `,
                previousPath: previousPath,
              }}
              className="rounded-full bg-jinsook-green hover:bg-white hover:border-2 border-jinsook-green transition duration-500 ease-in-out text-white hover:text-jinsook-green uppercase h-[40px] w-[100px] py-2 font-[600] text-[.8rem] px-4 flex items-center justify-center"
            >
              Enquiry
            </Link>
          </div>
        </div>

        {/* Related artworks section */}
        {filteredartworkFromSameTheme.length > 0 && (
          <div className="flex flex-col items-start gap-6 w-full">
            <Heading
              text={
                iscrafts
                  ? 'Similar products'
                  : `From the "${artwork.theme}"Theme`
              }
              color={getBackgroundColor()}
              forSingleItem={true}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full justify-items-center">
              {filteredartworkFromSameTheme.map((artwork) => (
                <ProductItem
                  item={artwork}
                  key={artwork._id}
                  previousPath={previousPath}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.section>
  )
}

export default SingleArtwork
