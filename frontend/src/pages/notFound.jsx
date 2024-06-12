import Loader from '../components/ui/loader'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <motion.section
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)]  flex flex-col items-center z-10 relative justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className=" md:text-[11rem] font-body text-jinsook-dark-green animate-colorchange md:-mb-10 sm:text-[8rem] text-[5rem]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        404
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Loader isNotFound={true} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link
          to="/"
          className="rounded-full w-[150px] bg-jinsook-green h-[50px] flex items-center justify-center text-white font-heading mt-10 hover:bg-white hover:text-jinsook-green hover:shadow-xl transition-all duration-300 ease-in-out font-bold uppercase"
        >
          Back to Home page
        </Link>
      </motion.div>
    </motion.section>
  )
}

export default NotFound
