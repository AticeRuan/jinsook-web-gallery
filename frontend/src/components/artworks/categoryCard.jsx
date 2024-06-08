import { Link } from 'react-router-dom'

const CategoryCard = ({
  category,
  imgUrl,
  desc,
  isReverse = false,
  isSmallScreen = false,
  previousPath = null,
}) => {
  const reverse = isReverse ? ' row-reverse' : ''
  const categoryname = (category) => {
    if (category === 'childrens-books') return "Children's Books"
    else return category
  }
  if (isSmallScreen)
    return (
      <div className="rounded-2xl  lg:w-[990px] md:w-[500px] w-[90%] flex bg-white  h-[800px] md:h-[900px] lg:h-[400px] overflow-hidden flex-col mb-10">
        {/* image block */}
        <div className="w-full lg:w-1/2 lg:h-full h-1/2 flex items-center justify-center overflow-hidden">
          <img
            src={imgUrl}
            alt={category}
            className="w-full h-full object-cover block object-center"
          />
        </div>{' '}
        {/* descrition block */}
        <div className="w-full lg:w-1/2 lg:h-full h-1/2  flex flex-col px-10 pt-5 gap-10 items-start justify-center  ">
          <p className="text-[1rem] font-heading font-[500] text-justify">
            {desc}
          </p>
          <Link
            to={`/artworks/${category}`}
            state={{ previousPath: previousPath }}
          >
            <button className="rounded-full bg-jinsook-green hover:bg-white border-2 border-jinsook-green transition duration-500 ease-in-out text-white hover:text-jinsook-green uppercase h-[40px] w-fit py-2 font-[600] text-[.8rem] px-4 flex items-center hover:shadow-xl">
              View All {categoryname(category)}
            </button>
          </Link>
        </div>
      </div>
    )
  return (
    <div
      className="rounded-2xl  md:w-[800px] w-[500px] flex bg-white h-[400px] overflow-hidden "
      style={{ flexDirection: reverse }}
    >
      {/* descrition block */}
      <div className="w-1/2 flex flex-col px-10 py-5 gap-10 items-start justify-center  ">
        <p className="text-[1rem] font-heading font-[500] text-justify">
          {desc}
        </p>
        <Link
          to={`/artworks/${category}`}
          state={{ previousPath: previousPath }}
        >
          <button className="rounded-full bg-jinsook-green hover:bg-white border-2 border-jinsook-green transition duration-500 ease-in-out text-white hover:text-jinsook-green uppercase h-[40px] w-fit py-2 font-[600] text-[.8rem] px-4 hover:shadow-xl">
            View All {categoryname(category)}
          </button>
        </Link>
      </div>
      {/* image block */}
      <div className=" w-1/2 h-full flex items-center justify-center">
        <img
          src={imgUrl}
          alt={category}
          className="w-full h-full object-cover block object-center"
        />
      </div>
    </div>
  )
}

export default CategoryCard
