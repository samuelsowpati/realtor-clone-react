import React from 'react'
import { useLocation } from 'react-router'
import Chat from '../components/Chat'
import SideBar from '../components/SideBar'

export default function ChatHome() {
  let uid = useLocation()
  let listing_uid
  uid.state?listing_uid=uid.state.id:listing_uid=""
  return (
    <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
        <div className='rounded border-2 overflow-hidden flex border-white border-solid w-[65%] h-[80%]'>
          <SideBar listing_uid={listing_uid}/>
          <Chat/>
        </div>
    </div>
  )
}
