import { useState } from 'react'
import useUpdate from '../../hooks/useUpdate'
import { useAuthContext } from '../../hooks/useAuthContext'
import Heading from '../ui/heading'
const ChangePasswordForm = ({ onClose }) => {
  const { user } = useAuthContext()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const { updateData, loading, error } = useUpdate()
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    const endpoint = '/api/users/change-password'
    const newData = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      username: user.username,
    }

    const response = await updateData(endpoint, newData)

    if (response) {
      setSuccess(true)
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  }

  return (
    <div className="fixed top-0 left-0 flex w-screen h-screen items-center justify-center backdrop-contrast-[0.25]">
      <div className="rounded-lg bg-jinsook-blue md:p-20 sm:p-10 p-5 m-5 flex flex-col gap-10 items-center justify-center font-body font-[500]">
        <Heading text="Change Password" color="#009379" />

        {success ? (
          <div>
            <p className="text-jinsook-green text-[1.5rem] font-heading font-[500]">
              Password updated
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-center gap-10"
          >
            <div className="flex items-center gap-3  bg-white rounded-lg p-2 w-full">
              <label className="block font-bold  font-heading  whitespace-nowrap">
                Current Password:
              </label>{' '}
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="rounded-sm appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />
            </div>
            <div className="flex items-center gap-3  bg-white rounded-lg p-2 w-full ">
              <label className="block font-bold  font-heading whitespace-nowrap">
                New Password:
              </label>{' '}
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg p-2 w-full">
              <label className="block font-bold  font-heading  whitespace-nowrap">
                Confirm New Password:
              </label>{' '}
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="rounded-sm appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />
            </div>
            <div className="flex items-center justify-center w-full gap-4 ">
              <button
                onClick={onClose}
                className="hover:bg-jinsook-yellow bg-white hover:text-white text-jinsook-green font-body font-[600] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 hover:border-jinsook-yellow border-jinsook-green transition duration-500 ease-in-out h-[40px] w-[120px] uppercase flex items-center justify-center"
              >
                cancle
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-jinsook-green hover:bg-white text-white hover:text-jinsook-green font-body font-[600] py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:border-2 border-jinsook-green transition duration-500 ease-in-out h-[40px] w-[250px] uppercase flex items-center justify-center ]"
              >
                {loading ? 'Changing Password...' : 'Change Password'}
              </button>
            </div>
          </form>
        )}
        {error && (
          <div className="text-jinsook-dark-pink text-[0.8rem] font-body font-[500]">
            Error: {error.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChangePasswordForm
