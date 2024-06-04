import { useParams } from 'react-router-dom'
import PageTitle from '../components/ui/pageTitle'
const SingleCategory = () => {
  const { category } = useParams()
  const categoryname = (category) => {
    if (category === 'childrens-books') return "Children's Books"
    else return category
  }
  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[5px] md:pt-[150px] flex flex-col items-center gap-20">
      <div className="text-start w-full mt-10">
        <PageTitle
          heading={categoryname(category)}
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo varius dignissim. Nulla maximus sed est sed molestie. Curabitur nec neque volutpat, eleifend neque ut, dignissim orci. Vivamus pellentesque libero lorem, id dictum neque dignissim ac. Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus. "
        />
      </div>
      <div></div>
    </div>
  )
}

export default SingleCategory
