import ContactForm from '../components/contact/contactForm'
import PageTitle from '../components/ui/pageTitle'

const Contact = () => {
  return (
    <div className="w-screen xl:w-[1000px] min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-28 z-10 relative">
      {/* heading */}
      <div className="text-start w-full mt-10">
        <PageTitle heading="Contact Jinsook " />
      </div>
      <div className="flex flex-col lg:flex-row w-full px-5 md:px-20 items-start gap-10 xl:px-5  ">
        {/* blurb */}
        <div className="flex flex-col gap-12 md:gap-20 items-start justify-center lg:w-1/2 lg:pr-10 ">
          <p className="font-heading font-[700] text-[2rem]">
            Let&apos;s work togther
          </p>
          <p className="font-body text-[1rem] text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            dignissim enim et eros porttitor, vitae elementum arcu placerat.
            Nunc porttitor urna scelerisque risus fermentum pharetra.
          </p>
        </div>
        {/* form */}
        <div className="lg:w-1/2 w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact
