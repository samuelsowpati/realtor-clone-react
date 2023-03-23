import React from 'react'
import Chat from '../components/Chat'
import SideBar from '../components/SideBar'

export default function ChatHome() {
  return (
    <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
        <div className='rounded border-2 overflow-hidden flex border-white border-solid w-[65%] h-[80%]'>
          <SideBar/>
          <Chat/>
        </div>
    </div>
  )
}
