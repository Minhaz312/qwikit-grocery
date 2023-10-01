"use client"
import { getAllCartItem, removeCartItem, updateQuantity } from '@/actions/product/cart'
import { API_DOMAIN } from '@/constants'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsTrash2Fill } from 'react-icons/bs'

export default function Cart({show,handleShowCart}) {
  const [cartList, setCartList] = useState(getAllCartItem())

  let totalProductPrice = 0;
  let totalNumberOfProduct = 0;
  if(cartList!==null){
    cartList.map(item=>{
      totalProductPrice += Number(item.totalPrice)
    })
    cartList.map(item=>{
      totalNumberOfProduct += Number(item.quantity)
    })
  }
  const handleIncreseItem = (item) => {
      if(item.quantity<10 && item.quantity>0){
          updateQuantity("inc",item,cartList)
          setCartList(getAllCartItem())
      }
  }
  const handleDecreseItem = (item) => {
      if(item.quantity>1){
          updateQuantity("dec",item,cartList)
          setCartList(getAllCartItem())
      }
  }
  const handleRemoveCartItem = item => {
    removeCartItem(item,cartList)
    setCartList(getAllCartItem())
  }
  useEffect(()=>{},[cartList])
  return (
    <div className='fixed z-50 bg-black/50 backdrop-blur-sm w-full h-full overflow-hidden flex justify-end'>
      <div className='cart-show-animation bg-white w-[400px] p-3 overflow-hidden flex flex-col justify-between'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='font-semibold text-md'>My Cart</h3>
          <button onClick={handleShowCart}><AiOutlineClose size={20} /></button>
        </div>
        <div className='flex w-full overflow-hidden h-full flex-col justify-between'>
          <div className='overflow-y-auto overflow-x-hidden'>
            {cartList!==null?cartList.map((item,i)=><div key={i} className='flex bg-slate-100 p-2 rounded mb-1'>
              <img src={`${API_DOMAIN}/${item.p_image}`} className='w-[70px] h-auto' />
              <div className='w-full flex justify-between'>
                <div className=' px-3'>
                  <p className='text-[12px]'>{item.p_name.substring(0,80)}</p>
                  <p className='my-1'><span className='mr-1'>&#2547;</span>{item.p_price}|<span className='font-semibold'>{item.totalPrice}</span></p>
                  <div className='flex items-center'>
                      <button onClick={handleDecreseItem.bind(this,item)} className='px-2 py-0.5 bg-slate-300 mr-2'>-</button>
                      <input type='number' max={10} min={1} disabled value={item.quantity} onChange={e=>setQuantity(e.target.value)} className='text-center text-sm bg-transparent border-0 outline-none min-w-[30px] max-w-[50px]' />
                      <button onClick={handleIncreseItem.bind(this,item)} className='px-2 py-0.5 bg-slate-300'>+</button>
                  </div>
                </div>
                <button className='text-red-800' onClick={handleRemoveCartItem.bind(this,item)}><BsTrash2Fill /></button>
              </div>
            </div>):<div className='h-full w-full flex justify-center items-center'>No product added</div>}
          </div>
          {cartList!==null&&(<div className='w-full bg-white shadow rounded p-5'>
            <div className='flex justify-between my-2 items-center'>
              <h2>Total Product</h2>
              <p>{totalNumberOfProduct}</p>
            </div>
            <div className='flex justify-between my-2 items-center'>
              <h2>Total Price</h2>
              <p>{totalProductPrice}</p>
            </div>
            <button className='px-3 py-1.5 bg-blue-800 text-white font-semibold rounded-md mt-3'>Checkout</button>
          </div>)}
        </div>
      </div>
    </div>
  )
}
