import { getPaginatedProduct } from '@/actions/product/getProducts'
import React, { useState } from 'react'
import ProductList from './ProductList'

export default function LoadMoreProduct({totalProduct}) {
    const [page,setPage] = useState(1)
    const [loadingMoreProduct, setLoadingMoreProduct] = useState(false)
    const [loadedMoreProduct, setLoadedMoreProduct] = useState(null)
    const handleLoadMoreProduct = async () => {
        setLoadingMoreProduct(true)
        console.log('sending page: ',page)
        const res = await getPaginatedProduct(page)
        console.log('loadmore res: ',res)
        if(res){
            const newPage = page+1
            setPage(newPage)
            setLoadedMoreProduct(res)
            setLoadingMoreProduct(false)
        }
    }
  return (
    <div>
        <div className='my-3'>
            {loadedMoreProduct!==null&&<ProductList loadingProduct={loadingMoreProduct} productList={loadedMoreProduct} />}
        </div>
        { Number(totalProduct)!==page*15&&<div className='my-3 flex justify-center items-center'>
            <button className='px-4 py-1.5 text-sm border border-slate-500 rounded' onClick={handleLoadMoreProduct}>{loadingMoreProduct?"Loading...":"Load More"}</button>
        </div>}
    </div>
  )
}
