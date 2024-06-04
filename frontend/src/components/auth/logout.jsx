import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

const Logout = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    user && (
      <button
        onClick={handleClick}
        className="bg-jinsook-green hover:bg-white text-white hover:text-jinsook-green font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-500 ease-in-out w-[100px] md:w-[120px] h-[35px] md:h-[40px] border-jinsook-green hover:border-2 uppercase flex items-center justify-center text-[.8rem] md:text-[1rem] font-heading"
      >
        Log out
      </button>
    )
  )
}

export default Logout
