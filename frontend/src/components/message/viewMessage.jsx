import useRead from '../../hooks/useRead'
import useUpdate from '../../hooks/useUpdate'
import { useState, useEffect } from 'react'
import { useMessagesContext } from '../../hooks/useMessageContext'
import useDelete from '../../hooks/useDelete'
import DeleteConfirmation from '../dashboard/deleteConfirmation'
import dateformat, { masks } from 'dateformat'
import Delete from '../svg/delete'
import { Link } from 'react-router-dom'
import Loading from '../svg/loading'

const ViewMessage = ({ onClose }) => {
  const { loading, data: fetchedMessages } = useRead('messages')
  const { updateData } = useUpdate()
  const { deleteData, loading: deleteLoading } = useDelete()
  const { messages, dispatch } = useMessagesContext()
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (fetchedMessages && fetchedMessages.length > 0) {
      setSelectedItemId(fetchedMessages[0]._id)
    }
  }, [fetchedMessages])

  const sortedMessages = messages.slice().sort((a, b) => b.unread - a.unread)

  const selectedItem = messages?.find(
    (message) => message._id === selectedItemId,
  )
  const [itemToDelete, setItemToDelete] = useState(null)

  const handleClick = (message) => {
    const newMessageData = {
      ...message,
      unread: false,
    }
    updateData(`messages/${message._id}`, newMessageData).then(() => {
      dispatch({ type: 'UPDATE_MESSAGE', payload: newMessageData })
    })
  }

  const handleDelete = () => {
    deleteData(`messages/${itemToDelete._id}`)
      .then(() => {
        dispatch({ type: 'DELETE_MESSAGE', payload: itemToDelete })
      })
      .finally(() => {
        setShowConfirm(false)
      })
  }
  //   const setDateFormat = (date) => {
  //     return dateformat(date, 'H:MM, ddd, d,mmm')
  //   }
  const setDateFormat = (date) => {
    const currentDate = new Date()
    const messageDate = new Date(date)

    currentDate.setHours(0, 0, 0, 0)
    messageDate.setHours(0, 0, 0, 0)
    const diffInDays = Math.floor(
      (currentDate - messageDate) / (1000 * 60 * 60 * 24),
    )

    if (diffInDays <= 7 && diffInDays > 1) {
      return dateformat(date, 'H:MM, dddd')
    } else if (diffInDays === 0) {
      masks.hammerTime = 'HH:MM "Today"'
      return dateformat(date, 'hammerTime')
    } else if (diffInDays === 1) {
      masks.hammerTime = 'HH:MM "Yesterday"'
      return dateformat(date, 'hammerTime')
    } else if (diffInDays >= 365) {
      return dateformat(date, 'H:MM,  d,mm,yyyy')
    } else {
      return dateformat(date, 'H:MM, ddd, d,mmm')
    }
  }

  const setBackGroundColor = (item) => {
    if (item.unread) {
      return 'rgba(253, 234, 223,0.5)'
    }
    if (item._id === selectedItemId) {
      return 'rgba(205, 231, 227,0.5)'
    }
    return 'white'
  }

  return (
    <section className="fixed top-0 left-0 flex  w-screen h-screen backdrop-contrast-[0.25] items-center flex-col justify-center z-10 ">
      <div className="overflow-hidden w-[80%] lg:w-[50%] xl:w-[45%] 2xl:w-[35%] h-[50%] flex bg-jinsook-blue rounded-3xl flex-col pt-4 pb-6 px-6 gap-2 ">
        <div
          className="flex w-full cursor-pointer justify-end"
          onClick={onClose}
        >
          <p className="text-jinsook-green font-bold scale-x-[1.2] text-xl ">
            X
          </p>
        </div>
        <div className="w-full flex gap-3 overflow-auto h-full">
          {loading && (
            <div className="flex  w-[50%] h-full  bg-white  items-center justify-center ">
              <div className="w-[50px]">
                <Loading />
              </div>
            </div>
          )}

          {!loading && (
            <div className="overflow-y-scroll w-[50%] bg-white overscroll-contain h-full rounded-l-2xl ">
              {sortedMessages &&
                sortedMessages.map((message) => (
                  <div
                    key={message._id}
                    style={{
                      backgroundColor: setBackGroundColor(message),
                    }}
                    className="p-2  border-b-2 border-jinsook-blue cursor-pointer "
                    onClick={() => {
                      setSelectedItemId(message._id)
                      handleClick(message)
                    }}
                  >
                    <div className="flex justify-between items-end ">
                      {' '}
                      <p className="font-body capitalize font-bold  text-[0.7rem] sm:text-[1rem]  truncate">
                        {message.name}
                      </p>
                      <button
                        onClick={() => {
                          setItemToDelete(message)
                          setShowConfirm(true)
                        }}
                        className="w-[12px] sm:w-[15px] mr-3"
                      >
                        <Delete />
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <p className="font-heading text-ellipsis text-gray-700 truncate text-[0.8rem]  hidden sm:block max-w-[50%] md:max-w-[60%]">
                        {message.msg}
                      </p>
                      <p className="font-body text-[0.6rem] sm:text-xs   text-gray-500 w-fit">
                        {setDateFormat(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          <DeleteConfirmation
            show={showConfirm}
            onCancel={() => setShowConfirm(false)}
            onConfirm={handleDelete}
            loading={deleteLoading}
            text="Delete this message?"
          />
          <div className="overflow-hidden  h-full  bg-white rounded-r-2xl w-[70%] sm:w-[50%] ">
            {' '}
            {selectedItem && (
              <div className="flex flex-col w-full h-full p-1 overflow-y-scroll">
                <div className="h-[12%] flex items-start justify-center flex-col">
                  <p className="capitalize font-body font-bold text-sm sm:text-lg">
                    {selectedItem.name}
                  </p>{' '}
                  <p className=" text-[0.6rem] text-wrap whitespace-pre-wrap">
                    {setDateFormat(selectedItem.createdAt)}
                  </p>
                </div>
                <div className=" cursor-pointer border-b-2 border-jinsook-blue py-1">
                  <Link to={`mailto:${selectedItem.email}`}>
                    <p className=" text-xs sm:text-sm text-wrap whitespace-pre-wrap truncate">
                      {selectedItem.email}
                    </p>
                  </Link>
                </div>

                <p className="font-heading text-sm pt-1">{selectedItem.msg}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewMessage
