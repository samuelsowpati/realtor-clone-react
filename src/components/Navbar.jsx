
import React, { useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const {currentuser} = useContext(AuthContext)

  return (
    <div className='flex items-center bg-[#2f2d52] h-12 p-2.5 justify-between text-[#ddddf7]'>
        <span className='font-bold '>Chat</span>
        <div className='flex gap-2.5'>
            <img className='bg-[#ddddf7] rounded-2xl h-6 w-6 object-cover' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png" alt="" />
            <span>{currentuser.displayName}</span>
        </div>
    </div>
  )
}
