import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import Heading from '../ui/heading'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(userName, password)
  }

  return (
    <div className="flex flex-col gap-5 w-full relative z-10 ">
      {' '}
      <Heading text="Admin Login" color="#009379" />
      <hr className="mx-3" />
      <form
        className="flex flex-col gap-10 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-7 items-center bg-white rounded-lg p-2 ">
          <label
            name="username"
            className="block  font-bold mb-2 font-heading "
          >
            Username:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="text"
            className="rounded-sm appearance-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>
        <div className="flex gap-7 items-center bg-white rounded-lg p-2 ">
          <label name="password" className="block  font-bold mb-2 font-heading">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className=" appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-jinsook-green hover:bg-white text-white hover:text-jinsook-green font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-500 ease-in-out w-fit h-[40px] border-jinsook-green hover:border-2 uppercase flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login in'}
        </button>
        {error && (
          <div className="text-jinsook-dark-pink text-[0.8rem] font-heading font-[600]">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default Login
