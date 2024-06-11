import ContactForm from '../components/contact/contactForm'
import PageTitle from '../components/ui/pageTitle'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Contact = () => {
  let { state } = useLocation()

  return (
    <motion.section
      className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-28 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* heading */}
      <motion.div
        className="text-start w-full mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PageTitle heading="Contact Jinsook " />
      </motion.div>
      <div className="flex flex-col lg:flex-row w-full px-5 md:px-20 items-start gap-10 xl:px-5  ">
        {/* blurb */}
        <motion.div
          className="flex flex-col gap-12 md:gap-20 items-start justify-center lg:w-1/2 lg:pr-10 "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p className="font-heading font-[700] text-[2rem]">
            Let&apos;s work togther
          </p>
          <p className="font-body text-[1rem] text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            dignissim enim et eros porttitor, vitae elementum arcu placerat.
            Nunc porttitor urna scelerisque risus fermentum pharetra.
          </p>
        </motion.div>
        {/* form */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <ContactForm subject={state && state.subject} />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact
