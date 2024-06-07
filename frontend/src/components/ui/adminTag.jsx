import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import useRead from '../../hooks/useRead'
import { useLocation } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import MessageIcon from './messageIcon'
import MessagePopup from './messagePopup'
import { useNavigate } from 'react-router-dom'
import { useMessagesContext } from '../../hooks/useMessageContext'
import ViewMessage from '../message/viewMessage'
const AdminTag = () => {
  const { user } = useAuthContext()
  const [islogout, setIsLogout] = useState(false)
  const { logout } = useLogout()

  useRead('messages')
  const { messages } = useMessagesContext()
  const newMessages = messages?.filter((message) => message.unread === true)
  const isNewMessage = newMessages?.length > 0

  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)

  const handleClick = () => {
    logout()
    setIsLogout(true)
  }

  const handleMessageOpen = () => {
    setShowMessage(true)
  }
  const handleMessageClose = () => {
    setShowMessage(false)
  }

  const styleForDashboard = () => {
    if (isDashboard) {
      return 'top-[30px] lg:top-[200px] sm:top-[120px] rounded-l-2xl right-0'
    }
    return 'hover:p-4 hover:h-fit hover:w-fit top-[150px] rounded-r-2xl left-0'
  }
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  return (
    <>
      {user && (
        <div
          className={`flex gap-2 items-center flex-col justify-center rounded fixed   ${styleForDashboard()}  pt-1 pr-1 bg-jinsook-yellow group h-[40px] w-[40px]   duration-300 ease-in-out origin-left z-[100]`}
        >
          {!isDashboard && (
            <p className="text-sm capitalize hidden group-hover:block  duration-0 delay-300 ">
              Hi {user.username}
            </p>
          )}
          {showMessage && <ViewMessage onClose={handleMessageClose} />}
          <button onClick={handleMessageOpen}>
            <MessageIcon
              count={newMessages ? newMessages.length : 0}
              isNewMessage={isNewMessage}
            />
          </button>
          {!isDashboard && (
            <button
              className="text-sm capitalize hidden group-hover:block duration-0  delay-300"
              onClick={() => handleClick()}
            >
              logout
            </button>
          )}
        </div>
      )}
      {islogout && (
        <MessagePopup
          text="You are logged out"
          show={islogout}
          onClose={navigate(0, { replace: true })}
        />
      )}
    </>
  )
}

export default AdminTag
