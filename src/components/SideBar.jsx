import React from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import SearchChat from './SearchChat'

export default function SideBar({listing_uid}) {
  return (
    <div className='w-1/3 bg-[#3e3c61] '>
        <Navbar/>
        <SearchChat listing_uid={listing_uid}/>
        <Chats/>
    </div>
  )
}
