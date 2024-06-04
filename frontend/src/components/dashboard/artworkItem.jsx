import Delete from '../svg/delete'
import Edit from '../svg/edit'

const ArtworkItem = ({ item, onUpdateClick, onDeleteClick }) => {
  const isFeatured = item.featured
  const isHeader = item.header
  return (
    <div className="w-[120px] lg:w-[150px] group relative cursor-pointer items-center flex justify-center">
      <div className=" flex items-center border-2 rounded-lg overflow-clip border-jinsook-blue relative">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] object-cover group-hover:grayscale group-hover:blur-[1px] transition-all duration-500 ease-in-out group-hover:opacity-60"
        />
        <div className="flex flex-col absolute top-[20%] gap-2">
          {isFeatured && (
            <span className=" bg-jinsook-green text-white text-xs capitalize font-bold p-1 group-hover:grayscale group-hover:blur-[1px] transition-all duration-500 ease-in-out">
              featured
            </span>
          )}
          {isHeader && (
            <span className="a bg-jinsook-yellow lg:text-xs capitalize font-[600] tracking-tighter p-1 group-hover:grayscale group-hover:blur-[1px] transition-all duration-500 ease-in-out text-[0.7rem]">
              category header
            </span>
          )}
        </div>{' '}
        <div className="group-hover:flex gap-3 w-full absolute top-[40%] bg-[rgba(255,255,255,0.7)] hidden transition-all duration-500 ease-in-out items-center justify-center ">
          <button onClick={() => onUpdateClick(item)} className="w-[30px]">
            <Edit />
          </button>{' '}
          <button onClick={() => onDeleteClick(item)} className="h-[20px]">
            <Delete />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArtworkItem
