import { Link } from 'react-router-dom'
const ProductItem = ({ item, forFeatured = false, previousPath = null }) => {
  const categoryname = (category) => {
    if (category === 'childrens-books') return "Children's Books"
    else return category
  }
  return (
    <div className="flex flex-col items-start justify-center w-[200px] ">
      <Link
        to={`/artworks/${item.category}/${item._id}`}
        state={{ previousPath: previousPath }}
      >
        <div className="w-[200px] h-[200px] overflow-hidden ">
          <img
            src={item.imageUrl}
            alt={item.title}
            className=" object-cover w-[100%] h-[100%]  block hover:scale-110  transition-transform duration-[800ms] ease-in-out"
          />
        </div>
      </Link>
      <Link
        to={`/artworks/${item.category}/${item._id}`}
        state={{ previousPath: previousPath }}
      >
        <p className="text-[1rem] font-heading font-[600] mt-4">{item.title}</p>
      </Link>
      {forFeatured && (
        <Link
          to={`/artworks/${item.category}`}
          state={{ previousPath: previousPath }}
        >
          <p className="text-[0.8rem] font-body uppercase tracking-tighter ">
            {categoryname(item.category)}
          </p>
        </Link>
      )}
      {item.price && (
        <p className="text-[0.8rem] font-body uppercase tracking-wider">
          {`$${item.price}`}
        </p>
      )}
    </div>
  )
}

export default ProductItem
