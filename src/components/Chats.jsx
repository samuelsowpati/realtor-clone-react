import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


export default function Chats() {

    const[chats,setChats]=useState([])
    const {currentuser}=useContext(AuthContext)
    const {dispatch}=useContext(ChatContext)


    useEffect(()=>{
    const getChats=()=>{
            //REALTIME UPDATES TO USERCHATS WILL UPDATE THE SIDEBAR LIST OF CONVOS
            const unsub = onSnapshot(doc(db, "userChats", currentuser.uid), (doc) => {
                setChats(doc.data())
                
        })
            return ()=>{
                unsub()
            }
    }
    currentuser.uid && getChats()
},[currentuser.uid])

const handleSelect=(u)=>{
    dispatch({type:'CHANGE_USER',payload:u})
}

  return (
    <div className='chats'>
        {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(

            <div key={chat[0]} className='userchat p-2 flex items-center gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]' onClick={()=>handleSelect(chat[1].userInfo)}>
                <img className='w-12 h-12 object-cover ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png" alt="" />
                <div className='userchatinfo'>
                    <span className='text-sm font-semibold '>{chat[1].userInfo.name}</span>
                    <p className='text-sm text-gray-300'>{chat[1].lastMessage?.text}</p>
                </div>
            </div>

        ))}
    </div>
  )
}
