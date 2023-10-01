"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import {HiHome} from 'react-icons/hi2'
import {BsBox2Fill} from 'react-icons/bs'
import {FaListAlt, FaUserCircle, FaUsers} from 'react-icons/fa'
import { AiOutlineSetting } from 'react-icons/ai';

export default function SidenavLinkRenderer() {
    const [openSublinkIndex, setOpenSublinkIndex] = useState(null)
    const links = [
    {name:"Home",icon:()=><HiHome />,link:"/admin/dashboard",children:[]},
    {name:"Product",icon:()=><BsBox2Fill />,link:"/admin/product",children:[
      {name:"Product List",link:"/admin/product/list"},
      {name:"Add Product",link:"/admin/product/add"}
    ]},
    {name:"Category",icon:()=><FaListAlt />,link:"/admin/category",children:[]},
    {name:"Customers",icon:()=><FaUsers />,link:"/admin/customers",children:[]},
    {name:"Employee",icon:()=><FaUserCircle />,link:"/admin/employee",children:[]},
    {name:"Settings",icon:()=><AiOutlineSetting />,link:"/admin/settings",children:[]},
  ]
  const handleOpenSublinks = i => {
    if(openSublinkIndex===null){
        setOpenSublinkIndex(i)
    }else{
        setOpenSublinkIndex(null)
    }
  }
  return (
    <div>
        {
            links.map((link,i)=>{
                const Icon = link.icon;
                if(link.children.length>0){
                    return <div key={i} className='p-3 bg-slate-600 mb-3 mx-3 rounded transition-all hover:bg-slate-700 cursor-pointer'>
                        <div className='flex gap-x-5' onClick={handleOpenSublinks.bind(this,i)}>
                            <div className='text-[25px]'><Icon /></div>
                            <p>{link.name}</p>
                        </div>
                        <div className={`${openSublinkIndex===i?"block":"hidden"} pt-3 px-3 pb-2 bg-slate-700 mt-3 rounded`}>
                            {
                                link.children.map((childLink,j)=><Link className='block text-sm mb-1 hover:bg-slate-800 py-2 px-2' href={childLink.link} key={j}>{childLink.name}</Link>)
                            }
                        </div>
                    </div>
                }else{
                    return <Link href={link.link} key={i} className='flex gap-x-5 p-3 bg-slate-600 mb-3 mx-3 rounded transition-all hover:bg-slate-700'>
                        <div className='text-[25px]'><Icon /></div>
                        <p>{link.name}</p>
                    </Link>
                }
            })
        }
    </div>
  )
}
