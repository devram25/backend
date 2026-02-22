"use client"

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl border border-gray-800 w-full max-w-md text-center">

        <h1 className="text-2xl font-bold mb-6">
          Profile Page
        </h1>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-3 rounded-lg font-semibold 
                     hover:bg-red-700 transition duration-200 active:scale-95"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;