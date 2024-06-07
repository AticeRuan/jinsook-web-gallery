import { useEffect, useState } from 'react'
import useUpdate from '../../hooks/useUpdate'
import { useAuthContext } from '../../hooks/useAuthContext'
import Heading from '../ui/heading'
import validator from 'validator'
import Tick from '../svg/tick'
import Cross from '../svg/cross'
import MessagePopup from '../ui/messagePopup'

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

  useEffect(() => {
    validatePassword(formData.newPassword)
  }, [formData.newPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // if (
    //   !isMatch ||
    //   !isStrongPassword ||
    //   !isLongEnough ||
    //   !hasUpperCase ||
    //   !hasNumber ||
    //   !hasCharacter
    // ) {
    //   return
    // }

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

  const [isLongEnough, setIsLongEnough] = useState(false)
  const [hasUpperCase, setHasUpperCase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasCharacter, setHasCharacter] = useState(false)
  const [isStrongPassword, setIsStrongPassword] = useState(false)
  const validatePassword = (password) => {
    if (password.length >= 8) {
      setIsLongEnough(true)
    }
    if (password.match(/[A-Z]/)) {
      setHasUpperCase(true)
    }
    if (password.match(/[0-9]/)) {
      setHasNumber(true)
    }
    if (password.match(/[!@#$%^&*]/)) {
      setHasCharacter(true)
    }
    if (validator.isStrongPassword(password)) {
      setIsStrongPassword(true)
    }
  }
  const isMatch = formData.newPassword === formData.confirmPassword

  if (success)
    return (
      <MessagePopup text="Password updated" show={success} onClose={onClose} />
    )

  return (
    <div className="fixed top-0 left-0 flex w-screen h-screen items-center justify-center backdrop-contrast-[0.25]">
      <div className="rounded-lg bg-jinsook-blue md:p-20 sm:p-10 p-5 m-5 flex flex-col gap-10 items-center justify-center font-body font-[500]">
        <Heading text="Change Password" color="#009379" />

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
          <div className="flex items-center gap-3  bg-white rounded-lg p-2 w-full  ">
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
          <div
            className="flex items-center gap-3 bg-white rounded-lg p-2 w-full"
            style={
              isMatch ? {} : { backgroundColor: 'rgba(222, 106, 151,0.5)' }
            }
          >
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
          <div>
            {error ? (
              <div className="text-jinsook-dark-pink text-[0.8rem] font-body font-[500]">
                Error: {error.message}
              </div>
            ) : (
              <>
                {' '}
                {isStrongPassword ? (
                  <p className="flex gap-2 font-heading font-[600] text-jinsook-green">
                    Your password is strong enough now
                    <p className="w-[15px]">
                      <Tick />
                    </p>
                  </p>
                ) : (
                  <>
                    {' '}
                    <p className="font-heading font-[700] text-jinsook-green">
                      Your password must include:
                    </p>
                    <ul>
                      <li className="flex gap-2 font-body font-[600] text-gray-500 ">
                        At least 8 characters{' '}
                        {isLongEnough ? (
                          <div className="w-[15px]">
                            <Tick />
                          </div>
                        ) : (
                          <div className="w-[15px]">
                            <Cross />
                          </div>
                        )}
                      </li>
                      <li className="flex gap-2 font-body font-[600] text-gray-500  ">
                        At least one uppercase letter{' '}
                        {hasUpperCase ? (
                          <div className="w-[15px]">
                            <Tick />
                          </div>
                        ) : (
                          <div className="w-[15px]">
                            <Cross />
                          </div>
                        )}
                      </li>

                      <li className="flex gap-2  font-[600] text-gray-500 ">
                        At least one number{' '}
                        {hasNumber ? (
                          <div className="w-[15px]">
                            <Tick />
                          </div>
                        ) : (
                          <div className="w-[15px]">
                            <Cross />
                          </div>
                        )}
                      </li>
                      <li className="flex gap-2  font-[600] text-gray-500 ">
                        At least one special character{' '}
                        {hasCharacter ? (
                          <div className="w-[15px]">
                            <Tick />
                          </div>
                        ) : (
                          <div className="w-[15px]">
                            <Cross />
                          </div>
                        )}
                      </li>
                    </ul>
                  </>
                )}
              </>
            )}{' '}
            {isMatch ? null : (
              <p className="font-heading font-[700] text-jinsook-dark-pink">
                New Password do not match
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordForm
