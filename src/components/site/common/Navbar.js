"use client"
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsCart, BsSearch } from 'react-icons/bs'
import Cart from './Cart'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
    const [showCart, setShowCart] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")

    const router = useRouter()

    const handleShowCart = () => {
        if(showCart){
            setShowCart(false)
        }else{
            setShowCart(true)
        }
    }
    const handleSearch = () => {
        if(searchKeyword.trim()!==""){
            router.push(`/product/search/${searchKeyword}`)
        }
    }
  return (
    <div>
        {showCart&&(<Cart show={showCart} handleShowCart={handleShowCart} />)}
        <div className='bg-white shadow sticky top-0 w-full z-40'>
        <div className='cs-container py-2'>
            <div className='flex justify-between items-center'>
                <div>
                    <Link href="/" className='font-bold uppercase text-xl'>QWIKIGrocery</Link>
                </div>
                <div className='hidden items-center lg:flex'>
                    <input type='search' value={searchKeyword} onChange={e=>setSearchKeyword(e.target.value)} className='max-w-[500px] min-w-[450px] outline-none border-0 px-3 py-2.5 bg-slate-100 text-sm' placeholder='Search product...' />
                    <button className='p-3 bg-black text-white' onClick={handleSearch}><BsSearch /></button>
                </div>
                <div className='flex gap-x-3'>
                    <button className='h-8 w-8 rounded-full flex justify-center items-center bg-slate-200' onClick={handleShowCart}><BsCart /></button>
                    <button className='h-8 w-8 rounded-full flex justify-center items-center bg-slate-200'><AiOutlineUser /></button>
                </div>
            </div>
            <div className='w-full flex justify-center mt-3 items-center lg:hidden'>
                <div className='w-full flex justify-center items-center lg:hidden'>
                    <input type='search' value={searchKeyword} onChange={e=>setSearchKeyword(e.target.value)} className='max-w-[500px] w-full xs:min-w-[300px] sm:min-w-[450px] outline-none border-0 px-3 py-2.5 bg-slate-100 text-sm' placeholder='Search product...' />
                    <button className='p-3 bg-black text-white' onClick={handleSearch}><BsSearch /></button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
