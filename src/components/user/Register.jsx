import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const { name, email, password, role } = formData

  const submitHandler = async (e) => {
    e.preventDefault()
    const result = await register(name, email, password, role)
    if (result.success) {
      navigate('/login')
    }
    console.log(formData)
  }

  return (
    <div className='mt-22 bg-gray-900 h-screen w-screen'>
      <div className='bg-gray-800 text-white max-w-2xl px-4 pt-4 pb-8 mx-6 sm:mx-auto my-24 rounded-md'>
        <h1 className='text-center text-3xl font-bold py-4'>Register</h1>
        <form className='flex flex-col' onSubmit={submitHandler}>
          <input 
            value={formData.name}
            onChange={onChangeHandler}
            name='name'
            className="border mx-4 my-3 text-white bg-gray-800 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder='Enter your name'
          />
          <input 
            value={formData.email}
            onChange={onChangeHandler}
            name='email'
            className="border mx-4 my-3 text-white bg-gray-800 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder='Enter your email'
          />
          <input 
            value={formData.password}
            onChange={onChangeHandler}
            name="password"
            className="border mx-4 my-3 text-white bg-gray-800 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder='Enter password'
          />
          {/* Role dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={onChangeHandler}
            className="border mx-4 my-3 text-white bg-gray-800 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            className="border mx-4 my-3 text-white bg-blue-600 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer hover:bg-blue-500"
            type='submit'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
