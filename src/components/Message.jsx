import React, { useContext, useEffect, useRef } from 'react'
import Moment from 'react-moment'
import { AuthContext } from '../context/AuthContext'

export default function Message({message}) {

  console.log(message)
  const {currentuser} =useContext(AuthContext)
  //const {data} =useContext(ChatContext)
 
  const ref=useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:'smooth'})
  },[message])

  return (
    <div ref={ref} className={`message flex gap-5 mb-5 ${message.senderId===currentuser.uid && 'flex-row-reverse'}`}> 
        
        <div className='messageinfo flex flex-col text-gray-400 font-semibold'>
            <img className='w-10 h-10 object-cover' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png" alt="" />
        <span><Moment fromNow>{message.date?.toDate()}</Moment></span>
        </div>
        <div className='messagecontent items-end max-w-[80%] flex flex-col gap-2.5'>
            <p className='bg-[#8da4f1] pl-2.5 pr-5 rounded-tr-md rounded-br-md rounded-bl-md '>{message.text}</p>
            {/*if owner <p className='bg-[#8da4f1] pl-2.5 pr-5 rounded-tl-xl rounded-br-xl rounded-bl-xl '>hello</p> */}
           { message.image && <img className={`w-[50%] ${message.senderId===currentuser.uid && 'flex-row-reverse'}`} src={message.image} alt="" />}
        </div>

    </div>
  )
}
