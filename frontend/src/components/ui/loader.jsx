import pencil from '../../assets/pencil.png'
const Loader = () => {
  return (
    <div className="h-[100px] flex flex-col w-20 gap-5 items-center justify-center">
      <img
        src={pencil}
        alt="loading"
        className="w-20 rotate-[330deg] animate-pencil-move "
      />
      <p className="animate-pulse font-bold whitespace-nowrap pl-9">
        {' '}
        Loading ......
      </p>
    </div>
  )
}

export default Loader
