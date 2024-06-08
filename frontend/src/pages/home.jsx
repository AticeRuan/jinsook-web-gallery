import PageTitle from '../components/ui/pageTitle'
import Heading from '../components/ui/heading'
import intro01 from '../assets/intro-01.png'
import intro02 from '../assets/intro-02.png'
import intro03 from '../assets/intro-03.png'
import IntroComponent from '../components/home/introComponent'
import ProductItem from '../components/ui/productItem'
import useRead from '../hooks/useRead'
import Loader from '../components/ui/loader'
import { useArtworksContext } from '../hooks/useArtworksContext'
import usePreviousPath from '../hooks/usePreviousPath'
const Home = () => {
  const { loading, error } = useRead('artworks')
  const { artworks } = useArtworksContext()
  const previousPath = usePreviousPath()
  if (loading)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center">
        <Loader />
      </div>
    )
  if (error)
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] flex items-center z-10 relative justify-center">
        Error: {error.message}
      </div>
    )
  const featuredArtworks =
    artworks && artworks.filter((artwork) => artwork.featured === true)

  return (
    <section className="max-w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-20 z-10 relative">
      <div className="mt-20  flex items-center justify-start flex-col ">
        <PageTitle
          heading="Jinsook Taylor"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus."
        />
      </div>
      {/* owner's title section */}
      <div className="mt-20 flex flex-col justify-start">
        <Heading text="Artistry & Storytelling" />
        <div className="bg-white rounded-lg flex items-center justify-center md:gap-20 gap-10 flex-col md:flex-row mt-10 px-10 py-28 w-[80vw] md:w-auto">
          <IntroComponent
            imgUrl={intro01}
            heading="Hand-drawn Artworks"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim"
          />
          <IntroComponent
            imgUrl={intro02}
            heading="Handcrafts"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim"
          />
          <IntroComponent
            imgUrl={intro03}
            heading="Children's Books"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim"
          />
        </div>
      </div>
      {/* feature products */}
      <div>
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
      </div>
    </section>
  )
}

export default Home
