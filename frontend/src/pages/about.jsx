import PageTitle from '../components/ui/pageTitle'
import portrait from '../assets/portrait.jpg'

const About = () => {
  return (
    <section className="w-full  min-h-[calc(100vh-120px)] pt-[50px] md:pt-[150px] flex flex-col items-center gap-16 md:gap-28">
      {/* heading */}
      <div className="flex items-start justify-start w-full mt-10">
        <PageTitle heading="About Jinsook" />
      </div>
      {/* bio */}
      <div className="w-screen flex items-center  justify-center bg-jinsook-blue py-10 ">
        <div className="flex items-center justify-center lg:w-[780px] md:w-[650px] flex-col md:flex-row gap-10 ">
          {/* profile */}
          <div className="flex flex-col items-center md:items-start justify-center w-[70rem]">
            <img
              src={portrait}
              alt="jinsook portrait"
              className="w-[200px] md:w-[500px] mb-4"
            />
            <p className="font-heading text-[1rem] font-bold">Jinsook Taylor</p>
            <p className="font-body text-[.9rem] font-[500]  tracking-wide">
              Artist/Story-writter
            </p>
          </div>
          {/* bio blurb */}
          <div className="flex flex-col items-start justify-center w-[300px] md:w-auto text-justify">
            <p className="font-heading font-bold text-[1.2rem]">Bio</p>
            <p className="font-body font-[500]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              commodo varius dignissim. Nulla maximus sed est sed molestie.
              Curabitur nec neque volutpat, eleifend neque ut, dignissim orci.
              Vivamus pellentesque libero lorem, id dictum neque dignissim ac.
              Vivamus nec dui tincidunt, fringilla magna non, imperdiet risus.
            </p>
          </div>
        </div>
      </div>
      {/* detail */}
      <div className="md:w-[800px] px-20 flex flex-col items-center justify-center gap-5 mb-10">
        <p className="font-heading text-[1.2rem] font-[500]">
          Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque dignissim enim et eros porttitor, vitae
          elementum arcu placerat. Nunc porttitor urna scelerisque risus
          fermentum pharetra.onsectetur adipiscing elit.{' '}
        </p>
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-white font-body font-[500] bg-jinsook-green w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className='"font-body font-[500]"'>
            Quisque dignissim enim et eros porttitor, vitae elementum arcu
            placerat. Nunc porttitor urna scelerisque risus fermentum pharetra.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-white font-body font-[500] bg-jinsook-green w-full">
            Mauris scelerisque augue vitae sem tincidunt, nec accumsan diam
            placerat.
          </p>
          <p className="font-body font-[500]">
            Nullam elementum urna magna, sit amet fermentum dolor cursus non.
            Aenean pharetra eleifend diam ut hendrerit.
          </p>
          <p className="font-body font-[500]">
            Nam et dui sed magna dictum sollicitudin non eget nulla. Aenean at
            ex gravida, volutpat leo eget, vulputate dolor. Donec pulvinar eu
            enim eu eleifend.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
