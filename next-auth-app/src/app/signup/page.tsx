"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:""
    })

    const Signup=()=>{

    }

  return (
    <div className=' flex flex-col h-screen w-screen justify-center items-center' >
        <div>
            <h1>Signup Page </h1>
        </div>
        <div className='flex flex-col gap-2' >
            <input className='py-2 px-4 border  ' type="text" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder='Username' />
            <input className='py-2 px-4 border  ' type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='Email' />
            <input className='py-2 px-4 border  ' type="text" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='Password' />
            <button onClick={Signup} className='py-2 px-4 border cursor-pointer ' >Signup </button>
            <Link href="/login" >Login Page</Link>
        </div>
    </div>
  )
}

export default page