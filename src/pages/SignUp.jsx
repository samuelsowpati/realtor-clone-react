import React, { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {db} from "../firebase"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const[showPassword, setShowPassword]=useState(false);

  const [formData, setFormData]=useState(
    {   name:"",
        email:"",
      password:"",
    })

  const {name, email, password}=formData;
  const navigate= useNavigate()
  
  function onChange(e){
  setFormData((prevState)=>({
    ...prevState,
    [e.target.id]: e.target.value,
  }))
  }

  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential=await createUserWithEmailAndPassword(auth, email, password)

      updateProfile(auth.currentUser,{displayName:name})

      const user=userCredential.user
      //deleting password after credential collected for security
      const formDataCopy={...formData}
      delete formData.password
      formDataCopy.timestamp=serverTimestamp()
      formDataCopy.uid = auth.currentUser.uid

      //now uploading data to fire db
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      await setDoc(doc(db, "userChats", user.uid), {})
      toast.success("Sign Up Successful!")
      //go to home after cred upload to db on click
      navigate("/")

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="logo key" 
          className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
          <input type="text" id="name" value={name} onChange={onChange} placeholder="Full Name" className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
            <input type="email" id="email" value={email} onChange={onChange} placeholder="Email Address" className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />

            <div className='relative mb-6'>
            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} placeholder="Password" className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />

            {showPassword ? <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/> : <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>}
            </div>
            
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have an account?
                <Link to="/sign-in" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Sign In</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot Password</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-medium hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign Up
            </button>
            <div className='flex items-center my-4 before:border-t before:flex-1 before-border-gray-300 
            after:border-t after:flex-1 after-border-gray-300'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth/>
          </form>
          
        </div>
      </div>
    </section>
  )
}
