import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
export default function Chat() {

  const {data}=useContext(ChatContext)

  return (
    <div className='w-2/3'>
      <div className='chatinfo h-12 bg-[#5d5b8d] flex items-center justify-between p-2 text-gray-300'>
        <span>{data.user?.name}</span>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
