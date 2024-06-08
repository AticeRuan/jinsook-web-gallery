import { useState } from 'react'
import useCreate from '../../hooks/useCreate'
import MessagePopup from '../ui/messagePopup'

const ContactForm = ({ subject }) => {
  const { createData } = useCreate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    msg: subject ? subject : '',
    unread: true,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  // let emptyFields = []
  // //input validation
  // if (!title) {
  //   emptyFields.push('title')
  // }
  // if (!category) {
  //   emptyFields.push('category')
  // }
  // if (!price) {
  //   emptyFields.push('price')
  // }
  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ err: 'Please fill in all the fields.', emptyFields })
  // }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSubmitting) return
    createData('messages', formData)
      .then(() => {
        setFormData({
          name: '',
          email: '',
          msg: '',
          unread: true,
        })
        setIsSent(true)
      })
      .finally(() => {
        setIsSubmitting(false)
        setIsSent(true)
      })
  }
  const handlePopupClose = () => {
    setIsSent(false)
  }
  const [isSent, setIsSent] = useState(false)

  return (
    <div className="w-full  ">
      {isSent && (
        <MessagePopup
          show={isSent}
          text="Message Sent"
          onClose={handlePopupClose}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white  rounded px-8 pt-6 pb-8 mb-4 gap-4 flex flex-col"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700  font-bold mb-2 font-heading "
          >
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="What is your name?"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2 font-heading"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            placeholder="How can I reach you?"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="msg"
            className="block text-gray-700  font-bold mb-2 font-heading"
          >
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            id="msg"
            name="msg"
            required
            value={formData.msg}
            onChange={handleChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="What can I help you with?"
            rows={10}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-jinsook-green hover:bg-white text-white hover:text-jinsook-green font-body font-[700] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 border-jinsook-green transition duration-500 ease-in-out h-[50px] w-[120px] uppercase text-center hover:shadow-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
