const ArtworkItem = ({ item, onUpdateClick, onDeleteClick }) => {
  const isFeatured = item.featured
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
        {isFeatured && (
          <span className="absolute top-[30%] bg-jinsook-green text-white text-xs capitalize font-bold">
            featured
          </span>
        )}
      </div>
      <button onClick={() => onUpdateClick(item)}>Edit</button>{' '}
      <button onClick={() => onDeleteClick(item)}>Delete</button>
    </div>
  )
}

export default ArtworkItem
