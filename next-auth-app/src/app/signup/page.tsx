"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:""
    })

    const [isButtonDisabled, setIsButtonDisabled] = useState(false )

    const Signup=async()=>{
         try {
            const response = await axios.post("/api/users/signup", user)
            console.log(response.data)
            router.push("/login")
         } catch (error) {
             console.log(error)
         }
    }

    useEffect(()=>{
       if(user.email.length > 0 && user.password.length>0 && user.username.length>0){
         setIsButtonDisabled(false)
       }else{
        setIsButtonDisabled(true)
       }
    },[user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
  <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-gray-800">
    
    <h1 className="text-3xl font-bold text-center mb-6">
      Create Account
    </h1>

    <div className="flex flex-col gap-4">
      
      <input
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

      <input
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <input
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button
        onClick={Signup}
        className="w-full bg-indigo-600 py-3 rounded-lg font-semibold 
                   hover:bg-indigo-700 transition duration-200 active:scale-95"
      >
        Sign Up
      </button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-indigo-400 hover:text-indigo-300 hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
</div>
  )
}

export default page