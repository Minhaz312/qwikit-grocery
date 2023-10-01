import React from 'react'

export default function page() {
    const summary = [
        {title:"Total Product",quantity:4243},
        {title:"Total Stock",quantity:1243},
        {title:"Total Category",quantity:6},
        {title:"Total User",quantity:3643},
        {title:"Total Revenue",quantity:156243},
    ]
  return (
    <div className='p-5'>
        <div className='grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3'>
            {
                summary.map((item,i)=><div className='flex justify-center items-center bg-white rounded shadow'>
                <div className='p-7 text-center'>
                    <h3 className='text-slate-500 font-semibold'>{item.title}</h3>
                    <h3 className='text-3xl text-slate-700 mt-1 font-bold'>{item.quantity}</h3>
                </div>
            </div>)
            }
        </div>        
    </div>
  )
}
