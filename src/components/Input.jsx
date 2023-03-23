import React, { useContext, useState } from 'react'
import {MdAttachFile} from 'react-icons/md'
import {AiFillPicture} from 'react-icons/ai'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { async } from '@firebase/util'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import {v4 as uuid} from 'uuid'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text,setText] = useState('')
  const [image,setImage] = useState(null)
  const [error,setError]=useState(false)
  const {currentuser} =useContext(AuthContext)
  const {data} =useContext(ChatContext)

  const handleSend=async()=>{
    if(image){
      const storage = getStorage()
      const storageRef = ref(storage,uuid())
      const uploadTask = uploadBytesResumable(storageRef,image)

      uploadTask.on(
        (error)=>{
          setError(true)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            await updateDoc(doc(db,'chats',data.chatId),{
              messages: arrayUnion({
                id:uuid(),
                text,
                senderId:currentuser.uid,
                date: Timestamp.now(),
                image:downloadURL
              }),
            })
          })
        }
      )

    }else{
      await updateDoc(doc(db,'chats',data.chatId),{
        messages: arrayUnion({
          id:uuid(),
          text,
          senderId:currentuser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db,'userChats',currentuser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),
    })

    await updateDoc(doc(db,'userChats',data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),
    })

    setText('')
    setImage(null)
  }
  return (
    <div className='input h-12 bg-white p-2.52 flex items-center justify-between'>
      <input type="text" onChange={e=>setText(e.target.value)} className='w-full border-none outline-none text-[#2f2d52] text-xl' placeholder='Type something...' value={text}/>
      <div className='send flex items-center gap-2.5'>
        <MdAttachFile/>
        <input type="file" style={{display:'none'}} id='file' onChange ={e=>setImage(e.target.files[0])}/>
        <label htmlFor="file">
         <AiFillPicture className='cursor-pointer '/>
        </label>
        <button onClick={handleSend} className='border-none pl-2.5 pr-4 mr-2 text-white bg-[#8da4f1]'>Send</button>
      </div>
    </div>
  )
}
