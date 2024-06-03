import PageTitle from '../components/ui/pageTitle'
import Heading from '../components/ui/heading'
import intro01 from '../assets/intro-01.png'
import intro02 from '../assets/intro-02.png'
import intro03 from '../assets/intro-03.png'
import IntroComponent from '../components/home/introComponent'
import ProductItem from '../components/ui/productItem'
import useRead from '../hooks/useRead'
const Home = () => {
  const { data: artworks, loading, error } = useRead('/api/artworks')
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  const featuredArtworks =
    artworks && artworks.filter((artwork) => artwork.featured === true)
  console.log(featuredArtworks)
  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[px] md:pt-[150px] flex flex-col items-center gap-20">
      <div className="mt-20 h-[30vh] flex items-center">
        <PageTitle
          heading="Jinsook Taylor"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus."
        />
      </div>
      {/* owner's title section */}
      <div>
        <Heading text="Artistry & Storytelling" />
        <div className="bg-white rounded-lg flex items-center justify-center md:gap-20 gap-10 flex-col md:flex-row mt-10 p-10">
          <IntroComponent
            imgUrl={intro01}
            heading="Hand-draw Artworks"
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
        <div className="bg-white rounded-lg grid grid-cols-2 md:grid-cols-3 mt-10 p-10 gap-8 md:gap-20 ">
          {featuredArtworks.map((artwork) => (
            <ProductItem item={artwork} key={artwork._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
