import ProductItem from './ProductItem'

export default function ProductList({loadingProduct,productList}) {
    return (
    <div>
        {loadingProduct&&(<div className='h-full w-full flex justify-center pt-5 items-center'><h3 className='mt-5'>Loading....</h3></div>)}
        {loadingProduct===false&&productList!==undefined&&productList.productList.length>0&&(<div className='h-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2'>
            {productList.productList.map((product,i)=><div key={i}>
                <ProductItem product={product} />
            </div>)}
        </div>)}
        {loadingProduct===false&&productList!==undefined&&productList.productList.length<1&&(<div className='h-full w-full flex justify-center pt-5 items-center'><h3 className='mt-5'>Product not found</h3></div>)}
        
    </div>
    )
}
