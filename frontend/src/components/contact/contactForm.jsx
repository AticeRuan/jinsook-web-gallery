import { useState } from 'react'
import useCreate from '../../hooks/useCreate'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    msg: '',
    unread: true,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Form submitted:', formData)
  }

  return (
    <div className="w-full  ">
      <form
        onSubmit={handleSubmit}
        className="bg-white  rounded px-8 pt-6 pb-8 mb-4 gap-4 flex flex-col"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700  font-bold mb-2 font-heading "
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
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
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            placeholder="How can I reach you?"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700  font-bold mb-2 font-heading"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
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
            className="bg-jinsook-green hover:bg-white text-white hover:text-jinsook-green font-body font-[700] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 border-jinsook-green transition duration-500 ease-in-out h-[50px] w-[120px] uppercase text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
