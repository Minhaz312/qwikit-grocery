"use client"
import { filterProductByCategory, getPaginatedProduct } from '@/actions/product/getProducts'
import ProductItem from './ProductItem'

export default async function ProductListByCategory({category}) {
    const res = await filterProductByCategory(category,0)
    return (
    <div>
        <div className='grid grid-cols-5 gap-2'>
        {res!==undefined&&res.productList.map((product,i)=><div key={i}>
            <ProductItem product={product} />
        </div>)}
    </div>
    </div>
    )
}
