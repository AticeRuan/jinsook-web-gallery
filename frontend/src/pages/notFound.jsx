import Loader from '../components/ui/loader'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)]  flex flex-col items-center z-10 relative justify-center">
      <p className=" md:text-[11rem] font-body text-jinsook-dark-green animate-colorchange md:-mb-10 sm:text-[8rem] text-[5rem]">
        404
      </p>
      <Loader isNotFound={true} />
      <Link
        to="/"
        className="rounded-full w-[150px] bg-jinsook-green h-[50px] flex items-center justify-center text-white font-heading mt-10 hover:bg-white hover:text-jinsook-green hover:shadow-xl transition-all duration-300 ease-in-out font-bold"
      >
        Back to Home
      </Link>
    </section>
  )
}

export default NotFound
