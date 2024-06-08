import Delete from '../svg/delete'
import Edit from '../svg/edit'
import Loader from '../ui/loader'

const ArtworkItem = ({ item, onUpdateClick, onDeleteClick, isLoading }) => {
  const isFeatured = item.featured
  const isHeader = item.header
  return (
    <div className="w-[130px] sm:w-[120px] md:w-[150px] group relative cursor-pointer items-center flex justify-center flex-col">
      <div className=" flex items-start border-2 rounded-lg overflow-clip border-jinsook-blue relative justify-start">
        {isLoading ? (
          <Loader />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] md:w-[140px] md:h-[140px] object-cover group-hover:grayscale group-hover:blur-[1px] transition-all duration-500 ease-in-out group-hover:opacity-60"
          />
        )}
        <div className="flex flex-col absolute top-[20%] gap-2">
          {isFeatured && (
            <span className=" bg-jinsook-green text-white text-xs capitalize font-bold p-1 group-hover:grayscale group-hover:blur-[1px] transition-all duration-500 ease-in-out">
              featured
            </span>
          )}
          {isHeader && (
            <span className="a bg-jinsook-yellow lg:text-xs capitalize font-[600] tracking-tighter p-1 group-hover:grayscale group-hover:blur-[1px] transition-all duration-500 ease-in-out text-[0.7rem]">
              {item.category} header
            </span>
          )}
        </div>{' '}
        <div className="group-hover:flex gap-3 w-full absolute top-[40%] bg-[rgba(255,255,255,0.7)] hidden transition-all duration-500 ease-in-out items-center justify-center ">
          <button onClick={() => onUpdateClick(item)} className="h-[30px]">
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
