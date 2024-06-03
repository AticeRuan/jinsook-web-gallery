import Heading from '../components/ui/heading'
import PageTitle from '../components/ui/pageTitle'
import useRead from '../hooks/useRead'
const Artworks = () => {
  const { data, loading, error } = useRead('/api/artworks')
  if (loading) {
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[px] md:pt-[150px] flex flex-col items-center">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[px] md:pt-[150px] flex flex-col items-center">
        Error: {error.message}
      </div>
    )
  }

  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[px] md:pt-[150px] flex flex-col items-center">
      <PageTitle
        heading="Artworks"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus."
      />
      <Heading text="products" />
    </div>
  )
}

export default Artworks
