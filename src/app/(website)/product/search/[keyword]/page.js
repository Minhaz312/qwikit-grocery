"use client"
import { searchProductByKeyword } from '@/actions/product/getProducts'
import ProductList from '@/components/home/ProductList'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page({params}) {
  const {keyword} = useParams()
  const [loading,setLoading] = useState(true)
  const [productList, setProductList] = useState(null)
  const handleGetSearchedProduct = async () => {
    setLoading(true)
    const res = await searchProductByKeyword(keyword,0)
    console.log('res: ',res)
    if(res){
      setLoading(false)
      setProductList(res)
    }
  }

  useEffect(()=>{
    handleGetSearchedProduct()
  },[keyword])

  return (
    <div className='min-h-screen w-full py-5'>
        <ProductList loadingProduct={loading} productList={productList} />
    </div>
  )
}
