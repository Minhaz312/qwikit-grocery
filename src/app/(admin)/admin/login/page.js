"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  const router = useRouter()
  const [authenticating, setAuthenticating] = useState(true)
  const handleClickLogin = () => {
    localStorage.setItem("qwiki_auth","auth-token")
    router.replace("/admin/dashboard")
  }
  useEffect(()=>{
    if(localStorage.getItem("qwiki_auth")!==null){
      router.replace("/admin/dashboard")
    }
    setAuthenticating(false)
  })
  if(authenticating){
    return <div className='w-full h-screen flex justify-center items-center'>
      Authenticating...
    </div>
  }
  return (
    <div className='bg-slate-300 flex justify-center items-center w-full h-screen'>
        <div className='bg-white rounded shadow p-5'>
            <h1 className='uppercase text-center font-semibold text-3xl my-5'>ADMIN LOGIN</h1>
            <div className='my-5'>
                <input type='text' className='block w-full px-3 py-2 mb-4 bg-slate-100 md:w-[500px]' placeholder='Enter Name' disabled defaultValue="super admin" />
                <input type='password' className='block w-full px-3 py-2 mb-4 bg-slate-100 md:w-[500px]' placeholder='Enter Password' disabled defaultValue="123456789" />
                <button className='mt-5 px-3 py-2 w-full bg-blue-950 hover:bg-blue-950/90 font-semibold text-md text-white rounded' onClick={handleClickLogin}>login</button>
            </div>
        </div>              
    </div>
  )
}
