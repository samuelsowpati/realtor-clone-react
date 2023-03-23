
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'

export default function SearchChat() {
  const [username,setUsername] = useState('')
  const [user,setUser] = useState(null)
  const [error,setError]=useState(false)
  const { currentuser } = useContext(AuthContext);

  
  const handleSearch=async ()=>{
    const userRef = collection(db,'users')
    const q=query(userRef,where('name','==',username))
    try {
      const querySnapshot=await getDocs(q)
      querySnapshot.forEach((doc)=>{
        setUser(doc.data())
      }) 
    } catch (error) {
      setError(true)
    }

  }

  const handleKey = (e)=>{
    e.code==='Enter' && handleSearch()
  }

  const handleSelect=async ()=>{
    //check if group(chats in firestore) exists? else create new chat
    const combinedId=currentuser.uid > user.uid ? currentuser.uid+user.uid : user.uid+currentuser.uid
    // //refer 1:45:05 lama dev
    // dispatch({type:'CHANGE_USER',payload:u})
    
    try {
      const res = await getDoc(doc(db, 'chats',combinedId))

      if(!res.exists()){
        //create a chat in chats collection
        await setDoc(doc(db,'chats',combinedId),{messages:[]})
        
        //create userChats for both users 
        await updateDoc(doc(db,'userChats',currentuser.uid),{
          [combinedId+'.userInfo']:{
            uid:user.uid,
            name: user.name
          },

          [combinedId+'.date']:serverTimestamp()
        })
        
        await updateDoc(doc(db,'userChats',user.uid),{
          [combinedId+'.userInfo']:{
            uid:currentuser.uid,
            name: currentuser.displayName
          },

          [combinedId+'.date']:serverTimestamp()
        })
      }

    } catch (error) {}
    setUser(null)
    setUsername("")
  }
  return (
    
    <div className='search border-b-2 border-solid border-gray-500 '>
        <div className='searchform p-2.5'>
            <input className='bg-transparent border-none text-white ' type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} value={username}/>
        </div>
        {error && <span>User not found!</span>}
        {user && <div className='userchat p-2 flex items-center gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]' onClick ={handleSelect}>
            
            <img className='w-12 h-12 object-cover ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png" alt="" />
            <div className='userchatinfo'>
                <span text-sm font-semibold >{user.name}</span>
           
            </div>
        </div>}
    </div>
  )
}
