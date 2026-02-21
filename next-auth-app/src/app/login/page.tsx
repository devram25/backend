"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
        const router = useRouter()
        const [user, setUser] = useState({
            password:"",
            // username:"",
            email:""
        })
    
        const Login=async()=>{
                 try {
                       const response = await axios.post("/api/users/login", user)
                       console.log(response.data)
                       router.push("/profile")
                    } catch (error) {
                        console.log(error)
                    }
        }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
  <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-gray-800">

    <h1 className="text-3xl font-bold text-center mb-6">
      Welcome Back
    </h1>

    <div className="flex flex-col gap-4">

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
        onClick={Login}
        className="w-full bg-indigo-600 py-3 rounded-lg font-semibold 
                   hover:bg-indigo-700 transition duration-200 active:scale-95"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="text-indigo-400 hover:text-indigo-300 hover:underline"
        >
          Create Account
        </Link>
      </p>

    </div>
  </div>
</div>
  )
}

export default page