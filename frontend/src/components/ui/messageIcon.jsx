import Message from '../svg/message'

const MessageIcon = ({ count = 0, isNewMessage = true }) => {
  const setColour = () => {
    if (isNewMessage) {
      return 'animate-pulse'
    }
  }
  return (
    <>
      <div className={`w-[20px]  relative ${setColour()} cursor-pointer`}>
        <Message color={isNewMessage ? '#947ac2' : '#9c99a1'} />
        {isNewMessage ? (
          <span className="text-white bg-red-800 absolute w-[15px] text-xs font-bold flex items-center justify-center rounded-full -top-2 -right-2">
            {count}
          </span>
        ) : (
          <>
            {' '}
            <span className="text-white bg-jinsook-green absolute w-[15px] text-xs font-bold flex items-center justify-center rounded-full -top-2 -right-2">
              0
            </span>
          </>
        )}
      </div>
    </>
  )
}

export default MessageIcon
