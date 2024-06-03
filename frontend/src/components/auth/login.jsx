import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(userName, password)
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label name="user name">Username:</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        name="text"
      />
      <label name="password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />
      <button type="submit" disabled={isLoading}>
        Log in
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login
