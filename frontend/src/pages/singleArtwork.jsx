import { useParams, Link } from 'react-router-dom'
import useRead from '../hooks/useRead'
import PageTitle from '../components/ui/pageTitle'
import Heading from '../components/ui/heading'
import ProductItem from '../components/ui/productItem'
import Loader from '../components/ui/loader'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const SingleArtwork = () => {
  const { category, id } = useParams()
  const isHandcrafts = category === 'handcrafts'

  const getBackgroundColor = () => {
    if (category == 'paintings') {
      return '#FDEADF'
    } else if (category == 'childrens-books') {
      return '#009379'
    } else if (category == 'illustrations') {
      return '#CE88BA'
    } else if (category == 'handcrafts') {
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

  const handcrafts = allArtwork?.filter(
    (artwork) => artwork.category === 'handcrafts',
  )

  const itemWithSameTitle = handcrafts?.filter(
    (item) => item.title === artwork.title,
  )
  const imageArray = itemWithSameTitle?.map((item) => item.imageUrl)

  const artworkFromSameTheme =
    !loading && allArtwork?.filter((items) => items.theme === artwork.theme)

  const filteredartworkFromSameTheme =
    !loading && artworkFromSameTheme?.filter((item) => item._id !== artwork._id)

  if (loading)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center">
        <Loader />
      </div>
    )
  if (error)
    return (
      <div className="w-screen xl:w-[1200px] min-h-[calc(100vh-120px)]  flex flex-col items-center justify-center z-10 relative">
        Error: {error.message}
      </div>
    )
  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center z-10 relative">
      {/* heading */}
      <div className="mt-10 text-left w-full">
        <PageTitle heading={getCategoryName(category)} />
      </div>
      {/* details */}
      <div className="rounded-xl flex bg-white  flex-col p-20 w-[90vw] lg:w-[80vw] md:w-[85vw] xl:w-full gap-12 lg:gap-40">
        {/* items details */}
        {isHandcrafts ? (
          <div className="flex flex-col md:flex-row gap-2 lg:gap-10">
            <div className="w-full h-fit md:h-full md:w-3/5 lg:w-1/2 rounded-lg overflow-hidden md:hidden">
              <Carousel
                autoPlay={true}
                interval={3000}
                emulateTouch
                showStatus={false}
                centerMode
                centerSlidePercentage={100}
                showThumbs={false}
                transitionTime={1000}
              >
                {Array.isArray(imageArray) &&
                  imageArray.map((imgUrl, index) => (
                    <img src={imgUrl} key={index} />
                  ))}
              </Carousel>
            </div>
            <div className="w-full h-1/2 md:h-full md:w-3/5 lg:w-1/2 rounded-lg overflow-hidden hidden md:block">
              <Carousel
                autoPlay={true}
                interval={3000}
                showIndicators={false}
                emulateTouch
                showStatus={false}
                centerMode
                centerSlidePercentage={100}
                infiniteLoop={true}
                transitionTime={1000}
              >
                {Array.isArray(imageArray) &&
                  imageArray.map((imgUrl, index) => (
                    <img src={imgUrl} key={index} />
                  ))}
              </Carousel>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 md:max-w-[50%]">
              <h1 className="font-heading font-bold text-[1.2rem] sm:text-[1.5rem] whitespace-nowrap">
                {artwork.title}
              </h1>
              <p className="font-body font-[500] text-[1rem] sm:text-[1.2rem]">
                {artwork.price}
              </p>
              <p className="font-heading font-[500] tracking-widest text-sm sm:text-[1rem]">
                Description:
              </p>
              <p className="font-body font-[500] sm:text-[0.9rem] text-[0.8rem]">
                {artwork.description}
              </p>{' '}
              <p className="font-heading font-[500] tracking-widest text-sm sm:text-[1rem]">
                <span className="font-heading font-[500] tracking-widest">
                  Medium:
                </span>
                {artwork.medium}
              </p>
              <p className="font-heading font-[500] tracking-widest text-sm sm:text-[1rem]">
                <span className="font-heading font-[500] tracking-widest">
                  Dimensions:
                </span>
                {artwork.dimensions}
              </p>
              <Link
                to="/contact"
                state={{
                  subject: `Hi Jinsook, I am messaging you regarding "${artwork.title}". `,
                }}
                className="rounded-full bg-jinsook-green hover:bg-white hover:border-2 border-jinsook-green transition duration-500 ease-in-out text-white hover:text-jinsook-green uppercase h-[40px] w-[100px] py-2 font-[600] text-[.8rem] px-4 flex items-center justify-center mt-3"
              >
                Enquiry
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-12 lg:gap-10">
            <div className="w-full h-1/2 md:h-full md:w-3/5 lg:w-1/2 rounded-lg overflow-hidden">
              <img src={artwork.imageUrl} />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 max-w-[50%]">
              <h1 className="font-heading font-bold text-[1.5rem]">
                {artwork.title}
              </h1>
              <p className="font-body font-[500] text-[1.2rem]">
                {artwork.price}
              </p>
              <p className="font-heading font-[500] tracking-widest">
                Description:
              </p>
              <p className="font-body font-[500] text-[0.9rem]">
                {artwork.description}
              </p>{' '}
              <p className="font-heading font-[500] tracking-widest">
                <span className="font-heading font-[500] tracking-widest">
                  Theme:
                </span>
                {artwork.theme}
              </p>
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
                }}
                className="rounded-full bg-jinsook-green hover:bg-white hover:border-2 border-jinsook-green transition duration-500 ease-in-out text-white hover:text-jinsook-green uppercase h-[40px] w-[100px] py-2 font-[600] text-[.8rem] px-4 flex items-center justify-center"
              >
                Enquiry
              </Link>
            </div>
          </div>
        )}

        {/* related artworks */}
        {!isHandcrafts && (
          <div className="flex flex-col items-start gap-6 w-full">
            <Heading
              text={`From the "${artwork.theme}" Theme`}
              color={getBackgroundColor()}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  w-full justify-items-center">
              {Array.isArray(filteredartworkFromSameTheme) &&
                filteredartworkFromSameTheme.map((artwork) => (
                  <ProductItem item={artwork} key={artwork._id} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleArtwork
