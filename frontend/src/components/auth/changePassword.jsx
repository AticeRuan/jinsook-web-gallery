import { useState } from 'react'
import useUpdate from '../../hooks/useUpdate'
import { useAuthContext } from '../../hooks/useAuthContext'
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
    <div className="absolute backdrop-blur-sm flex items-center justify-center w-screen h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h2>Change Password</h2>
        {success ? (
          <div>
            <p>Password updated</p>
            <button onClick={onClose}>OK</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Current Password:
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              New Password:
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Confirm New Password:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        )}
        {error && <div>Error: {error.message}</div>}
      </div>
    </div>
  )
}

export default ChangePasswordForm
