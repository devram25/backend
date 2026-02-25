"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout")

      router.push("/login");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  const [data, setData] = useState<any>("")

  const getUserDetails =async()=>{
     const response  = await axios.get(`/api/users/me`)
     console.log(response.data.data)
     setData(response.data?.data)
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl border border-gray-800 w-full max-w-md text-center">

        <h1 className="text-2xl font-bold mb-6">
          Profile Page
        </h1>
        <h2  className=" py-2 px-4 bg bg-green-400 my-2" >
          <Link href={`/profile/${data._id}`} >{data._id}</Link>
        </h2>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-3 rounded-lg font-semibold 
                     hover:bg-red-700 transition duration-200 active:scale-95"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="w-full bg-green-600 py-3 mt-2 rounded-lg font-semibold 
                     hover:bg-green-700 transition duration-200 active:scale-95"
        >
          Get Profile Data
        </button>

      </div>
    </div>
  );
};

export default Profile;