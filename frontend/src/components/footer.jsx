import Email from './svg/email'
import Facebook from './svg/facebook'
import Instagram from './svg/instagram'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="h-[120px] w-screen xl:w-[1000px] flex items-center justify-center py-3">
      <div className="flex items-center flex-col  gap-2">
        <div className="flex items-center justify-center gap-3">
          <div className="w-[20px]">
            <Instagram color="#CE88BA" />
          </div>
          <div className="w-[20px]">
            <Facebook color="#CE88BA" />
          </div>
          <div className="w-[20px]">
            <Email color="#CE88BA" />
          </div>
        </div>
        <p className="font-heading text-xs tracking-[0.2rem] font-[500]">
          © {year} Jinsook Taylor All Right Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
