const ArtworkItem = ({ item, onUpdateClick, onDeleteClick }) => {
  const isFeatured = item.featured
  const isHeader = item.header
  return (
    <div className="w-[300px]">
      <h2>Title:{item.title}</h2>
      <p>Category:{item.category}</p>
      <p>Price{item.price}</p>
      <p>Theme:{item.theme}</p>
      <div className="relative ">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-[150px] h-[150px] object-cover"
        />
        <div className="flex flex-col absolute top-[20%] gap-2">
          {isFeatured && (
            <span className=" bg-jinsook-green text-white text-xs capitalize font-bold p-1">
              featured
            </span>
          )}
          {isHeader && (
            <span className="a bg-jinsook-yellow text-xs capitalize font-[600] tracking-tighter p-1">
              category header
            </span>
          )}
        </div>
      </div>
      <button onClick={() => onUpdateClick(item)}>Edit</button>{' '}
      <button onClick={() => onDeleteClick(item)}>Delete</button>
    </div>
  )
}

export default ArtworkItem
