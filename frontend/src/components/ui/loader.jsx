import pencil from '../../assets/pencil.png'
const Loader = ({ isNotFound = false }) => {
  return (
    <div className="h-[100px] flex flex-col w-20 gap-5 items-center justify-center">
      <img
        src={pencil}
        alt="loading"
        className="w-20 rotate-[330deg] animate-pencil-move "
      />
      {isNotFound ? (
        <p className="font-bold whitespace-nowrap  uppercase">
          {' '}
          Page NOt found
        </p>
      ) : (
        <p className="animate-pulse font-bold whitespace-nowrap uppercase">
          {' '}
          Loading ......
        </p>
      )}
    </div>
  )
}

export default Loader
