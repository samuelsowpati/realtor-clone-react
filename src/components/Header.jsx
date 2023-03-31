import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {FaHeart, FaSearch} from 'react-icons/fa'
import {BsChatFill}from'react-icons/bs'
import { ethers } from 'ethers'
export default function Header() {
    const [pageState, setPageState] = useState("Sign-In")
    const [heart,setHeart]=useState(null)
    const [logged,setLogged]=useState(null)
    const [chat,setChat]=useState(null)
    const location=useLocation()
    const navigate=useNavigate()
    const[disabled, setDisabled] = useState(false)
    const auth=getAuth()

    const [account,setAccount]=useState(null)
    const connectHandler=async()=>{
        const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
        setAccount(accounts[0])
    }

    useEffect(()=>{
        async function loadBlockchainData(){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
        }
        loadBlockchainData()
    },[])


    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setPageState("Profile")
                setLogged(true)
                setHeart(true)
                setChat(true)
            } else{
                setPageState("Sign-In")
                setHeart(false)
                setChat(false)
            }
        })
    },[auth])

    function pathMatchRoute(route){
        if(route===location.pathname){
            return true
        }
    }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
            <div>
                <img src="https://raw.githubusercontent.com/deephunt3r/d/main/Screenshot%20from%202023-03-31%2018-35-31.png" alt="logo" className="h-5 cursor-pointer" onClick={()=>navigate("/")}/>
            </div>
            <div>
                <ul className="flex space-x-9">
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[4px]  ${pathMatchRoute("/") && " border-b-purple-500" }`} onClick={()=>navigate("/")}>Home</li>

                    <li className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[4px]  ${pathMatchRoute("/offers") && " border-b-purple-500" }`} onClick={()=>navigate("/offers")}>Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[4px]  ${pathMatchRoute("/search") && " border-b-purple-500" }`} onClick={()=>navigate("/search")}><FaSearch className='mt-1 text-black'/></li>

                    <li className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[4px]  ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-purple-500" }`} onClick={()=>navigate("/profile")}>{pageState}</li>
                   {heart && (<li  className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[4px]  ${pathMatchRoute("/favourite")  &&"text-black border-b-purple-500" }`} onClick={()=>navigate("/favourite")}><FaHeart className='mt-1 text-red-600' /></li>
                    )}
                   {chat && (<li  className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[4px]  ${pathMatchRoute("/chat-home")  &&"text-black border-b-purple-500" }`} onClick={()=>navigate("/chat-home")}><BsChatFill className='mt-1 text-blue-500' /></li>
                    )}
                    {account ? (<li><button type="button" className='w-[100px] h-[40px] mt-1 text-white bg-blue-600 border-none rounded-lg font-semibold cursor-pointer transition duration-150 ease-in-out'>{account.slice(0,6)+'...'+account.slice(38,42)}</button></li>
                    ): (<li><button type="button" onClick = {connectHandler}className='w-[100px] h-[40px] mt-1 text-white bg-blue-600 border-none rounded-lg font-semibold cursor-pointer transition duration-150 ease-in-out'> Connect </button></li>
                    )}


                </ul>
            </div>
        </header>
    </div>
  )
}
