import done from '../../assets/done.png'
import { useEffect } from 'react'
const MessagePopup = ({ text, show, onClose }) => {
  useEffect(() => {
    if (show) {
      return () => {
        const timer = setTimeout(() => {
          onClose()
        }, 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [show, onClose])
  return (
    show && (
      <section className="fixed top-0 left-0 flex  w-screen h-screen backdrop-contrast-[0.25] items-center justify-center">
        <div className="bg-jinsook-blue p-10 md:p-20 flex flex-col items-center justify-center rounded-3xl gap-3">
          <img
            src={done}
            alt="done"
            className="w-[100px] h-[100px] md:w-[166px] md:h-[166px]"
          />
          <p className="font-body font-bold text-[1rem] md:text-[2rem]">
            {text}
          </p>
        </div>
      </section>
    )
  )
}

export default MessagePopup
