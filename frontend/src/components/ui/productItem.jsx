const ProductItem = ({ item }) => {
  const categoryname = (category) => {
    if (category === 'childrens-books') return "Children's Books"
    else return category
  }
  return (
    <div className="flex flex-col items-start justify-center w-[200px] ">
      <div className="w-[200px] h-[200px] ">
        <img
          src={item.imageUrl}
          alt={item.title}
          className=" object-cover w-full h-full  block"
        />
      </div>
      <p className="text-[1rem] font-heading font-[600] mt-4">{item.title}</p>
      <p className="text-[0.8rem] font-body uppercase">
        {categoryname(item.category)}
      </p>
    </div>
  )
}

export default ProductItem
