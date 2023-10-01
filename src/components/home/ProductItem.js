"use client"
import React, { useState } from 'react'
import { API_DOMAIN } from '@/constants'
import Modal from '../custom-component/Modal'
import { addToCart } from '@/actions/product/cart'

export default function ProductItem({product}) {
    const [showProductDetailsModal,setShowProductDetailsModal] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [itemAdded,setItemAdded] = useState(false)
    const handleShowModal = () => {
        if(showProductDetailsModal){
            setShowProductDetailsModal(false)
        }else{
            setShowProductDetailsModal(true)
        }
    }
    const handleAddToCart  = () => {
        const totalPrice = Number(quantity)*Number(product.p_price)
        const cartItem = {...product,quantity,totalPrice}
        addToCart(cartItem)
        setItemAdded(true)
        setTimeout(()=>{
            setItemAdded(false)
        },2000)
    }
    const handleIncreseItem = () => {
        if(quantity<10 && quantity>=0){
            const newQty = Number(quantity)+1
            setQuantity(newQty)
        }
    }
    const handleDecreseItem = () => {
        if(quantity>1){
            const newQty = Number(quantity)-1
            setQuantity(newQty)
        }
    }
  return (
    <div>
        <Modal show={showProductDetailsModal} title="" onHide={handleShowModal} onActionTitle="Add To Cart" onAction={handleAddToCart} >
            <div className='block sm:flex gap-x-3'>
                <div className='p-3 border shadow bg-slate-50'>
                    <img src={`${API_DOMAIN}/${product.p_image}`} className='w-[200px] mx-auto sm:mx-0 sm:w-[230px] h-auto' />
                </div>
                <div className='w-[95%] xs:w-[400px]'>
                    <p className='font-[500] text-slate-700 text-xl mb-3'>{product.p_name}</p>
                    <p className='font-bold text-md'>&#2547;<span className='ms-1'>Price: {product.p_price}</span></p>
                    <p className='text-md mt-3'><span className='font-semibold mr-2'>Category:</span>{product.p_category}</p>
                    <div className='flex items-center my-3'>
                        <p className='font-bold text-md mr-2'>Quantity: </p>
                        <div className='flex items-center'>
                            <button onClick={handleDecreseItem} className='px-3 py-1 bg-slate-300'>-</button>
                            <input type='number' disabled max={10} min={1} value={quantity} onChange={e=>setQuantity(e.target.value)} className='text-center bg-transparent border-0 outline-none w-[50px]' />
                            <button onClick={handleIncreseItem} className='px-3 py-1 bg-slate-300'>+</button>
                        </div>
                    </div>
                    <span className='font-semibold block mt-3 mb-1'>Description</span>
                    <p className='text-sm line-clamp-5'>{product.p_desc}</p>
                </div>
            </div>
            {itemAdded&&(<p className='text-green-900 text-center my-3 block w-full'>Product added into cart</p>)}
        </Modal>
        <div className='bg-white rounded overflow-hidden' onClick={handleShowModal}>
            <img src={`${API_DOMAIN}/${product.p_image}`} className='w-full aspect-square' />
            <div className='p-2'>
                <p className='font-[500] h-[42px] text-slate-700 text-sm mb-2 line-clamp-2'>{product.p_name}</p>
                <p className='font-bold text-md'>&#2547;<span className='ms-1'>{product.p_price}</span></p>
            </div>
        </div>
    </div>
  )
}
