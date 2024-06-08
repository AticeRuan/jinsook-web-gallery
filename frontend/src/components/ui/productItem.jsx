import { Link } from 'react-router-dom'
const ProductItem = ({ item, forFeatured = false }) => {
  const categoryname = (category) => {
    if (category === 'childrens-books') return "Children's Books"
    else return category
  }
  return (
    <div className="flex flex-col items-start justify-center w-[200px] ">
      <Link to={`/artworks/${item.category}/${item._id}`}>
        <div className="w-[200px] h-[200px] overflow-hidden ">
          <img
            src={item.imageUrl}
            alt={item.title}
            className=" object-cover w-[100%] h-[100%]  block hover:scale-110  transition-transform duration-[800ms] ease-in-out"
          />
        </div>
      </Link>
      <Link to={`/artworks/${item.category}/${item._id}`}>
        <p className="text-[1rem] font-heading font-[600] mt-4">{item.title}</p>
      </Link>
      {forFeatured && (
        <Link to={`/artworks/${item.category}`}>
          <p className="text-[0.8rem] font-body uppercase tracking-tighter ">
            {categoryname(item.category)}
          </p>
        </Link>
      )}
      <p className="text-[0.8rem] font-body uppercase tracking-wider">
        {item.price}
      </p>
    </div>
  )
}

export default ProductItem
