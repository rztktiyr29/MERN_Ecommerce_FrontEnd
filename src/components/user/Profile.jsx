import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'

const Profile = () => {
    const {user} = useContext(AppContext)
  return (
    <div className='mt-22 bg-gray-900 w-screen min-h-screen flex flex-col items-center gap-2 text-white p-8'>
        <h1 className='text-3xl font-bold'>Welcome, {user?.name}</h1>
        <h3 className='text-2xl font-bold text-gray-400'>{user?.email}</h3>

    </div>
  )
}

export default Profile