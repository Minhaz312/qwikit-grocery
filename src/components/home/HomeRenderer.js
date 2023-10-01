
"use client"
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductListByCategory from './ProductListByCategory'
import { filterProductByCategory } from '@/actions/product/getProducts'
import LoadMoreProduct from './LoadMoreProduct'

export default function HomeRenderer({categoryList,productList}) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [productsList, setProductsList] = useState(productList)
    const [loadingProduct, setLoadingProduct] = useState(false)
    const handleSelectCategory = async (cat) => {
        setLoadingProduct(true)
        setSelectedCategory(cat)
        const res = await filterProductByCategory(cat,0)
        if(res){
            setLoadingProduct(false)
            if(res.success===true){
                setProductsList(res)
            }
        }
    }
    useEffect(()=>{},[productsList])
  return (
    <div className='flex w-full gap-x-3 min-h-screen h-auto'>
        <div className="bg-white w-[260px] shadow hidden lg:block rounded-lg sticky top-5" style={{maxHeight:"calc(100vh - 100px)",minHeight:"calc(100vh - 500px)",height:"auto"}}>
          <div className="flex items-center justify-between p-4">
              <p className="font-medium">Filter</p>
          </div>
          <hr />
          <div className="p-4 min-h-[300px]">
              <p className="mb-4 font-medium">Category</p>
              <ul className='space-y-3'>
                {
                  categoryList!==undefined&&(categoryList.data.map((cat,i)=><li key={i}>
                    <label className="flex items-center gap-2">
                      <input className="form-checkbox" type="radio" name="category" value={cat.name} onChange={handleSelectCategory.bind(this,cat.name)} />
                      <p className="text-gray-600 line-clamp-1">{cat.name}</p>
                    </label>
                </li>))
                }
                
              </ul>
          </div>
          <hr />
        </div>
        <div className="w-full">
          <ProductList productList={productsList} loadingProduct={loadingProduct} />
          {productList.totalProduct>15&&<LoadMoreProduct totalProduct={productsList.totalProduct} />}
        </div>
      </div>
  )
}
