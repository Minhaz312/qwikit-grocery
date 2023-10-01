"use client"
import {HiBars3} from 'react-icons/hi2'
import {AiOutlineUser,AiOutlineClose} from 'react-icons/ai'
import SidenavLinkRenderer from '@/components/admin/layout/SidenavLinkRenderer'
import { useEffect, useState } from 'react'
import StoreProvider from '@/store/StoreProvider'
import { useRouter } from 'next/navigation'
export default function DashboardLayout({children}) {
  const [showSidebar, setShowsidebar] = useState(true)
  const [authenticating, setAuthenticating] = useState(true)
  const router = useRouter()
  const handleShowSidebar = () => {
    if(showSidebar){
      setShowsidebar(false)
    }else{
      setShowsidebar(true)
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("qwiki_auth")===null){
        router.replace("/admin/login")
    }
    setAuthenticating(false)
  },[])
  if(authenticating){
    return <div className='w-full h-screen flex justify-center items-center'>
      Authenticating...
    </div>
  }
  return (
    <StoreProvider>
      <section className='w-full h-screen flex justify-between overflow-hidden bg-slate-200'>
      {
        showSidebar&&(<div className='w-1/2 h-screen bg-black text-white md:hidden fixed left-0 top-0 bottom-0'>
        <div className='my-3 px-3 flex justify-end'>
          <button onClick={handleShowSidebar} className='px-3 py-2 font-bold text-white'><AiOutlineClose /></button>
        </div>
        <SidenavLinkRenderer />
      </div>)
      }
      <div className={`${showSidebar?"md:block hidden":"hidden"} w-[300px] h-full bg-slate-800 text-white`}>
        <div>
          <h3 className='uppercase text-white text-center font-bold my-5 text-3xl'>My Grocery</h3>
          <SidenavLinkRenderer />
        </div>
      </div>
      <div className='w-full h-full flex justify-between flex-col overflow-hidden'>
      <nav className='bg-white shadow w-full'>
        <div className='p-3 flex justify-between items-center'>
          <button className='font-bold text-[25px] shadow-md px-3 py-1.5' onClick={handleShowSidebar}><HiBars3 /></button>
          <div>
            <button className='h-8 w-8 rounded-full flex justify-center items-center bg-slate-200'><AiOutlineUser /></button>
          </div>
        </div>
      </nav>
      <div className='w-full h-full overflow-y-auto'>{children}</div>
      </div>
    </section>
    </StoreProvider>
  )
}