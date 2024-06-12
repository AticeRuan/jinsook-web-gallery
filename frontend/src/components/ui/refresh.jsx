import { useNavigate } from 'react-router-dom'

export const Refresh = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(0)
  }
  return (
    <button
      to="/"
      className="rounded-full w-[150px] bg-jinsook-green h-[50px] flex items-center justify-center text-white font-heading mt-10 hover:bg-white hover:text-jinsook-green hover:shadow-xl transition-all duration-300 ease-in-out font-bold uppercase"
      onClick={handleClick}
    >
      try fresh
    </button>
  )
}

export default Refresh
