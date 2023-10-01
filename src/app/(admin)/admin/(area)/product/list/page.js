"use client"
import { deleteProductById, getPaginatedProduct } from '@/actions/product/getProducts'
import { API_DOMAIN } from '@/constants';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { MdOutlineNavigateNext } from 'react-icons/md'
import Modal from '@/components/custom-component/Modal';


export default function page() {
  const [productList, setProductList] = useState(null)
  const [totalProduct, setTotalProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const [page,setPage] = useState(0)
  
  const [showEditProductModal,setShowEditProductModal] = useState(false)
  const [selectedProduct,setSelectedProduct] = useState(null)


  const handleShowEditModal = product => {
    if(showEditProductModal){
      setShowEditProductModal(false)
      setSelectedProduct(null)
    }else{
      setSelectedProduct(product)
      setShowEditProductModal(true)
    }
  }
  const handleGetAllProduct = async () => {
    const result = await getPaginatedProduct(page)
    if(result && result.success){
      setProductList(result.productList)
      setTotalProduct(result.totalProduct)
      setLoading(false)
    }
  }

  const handleDeleteProduct = async id => {
    if(confirm("Are you sure?")){
      const res = await deleteProductById(id)
      console.log('delete res: ',res)
      handleGetAllProduct()
    }
  }

  
  useEffect(()=>{
    setLoading(false)
    handleGetAllProduct()
  },[])
  return (
    <>
      {selectedProduct!==null&&(
        <Modal show={showEditProductModal} title="Edit product" onHide={handleShowEditModal} onActionTitle="Update" onAction={()=>{}}>
          <img src={`${API_DOMAIN}/${selectedProduct.p_image}`} className='h-[200px] w-auto' />
          <input type='text' className='p-2 mt-3 rounded border border-slate-100 outline-none w-full block' defaultValue={selectedProduct.p_name} />
          <input type='text' className='p-2 mt-3 rounded border border-slate-100 outline-none w-full block' defaultValue={selectedProduct.p_price} />
          <input type='text' className='p-2 mt-3 rounded border border-slate-100 outline-none w-full block' defaultValue={selectedProduct.p_category} />
          <textarea rows={5} className='p-2 mt-3 rounded border border-slate-100 outline-none w-full block' defaultValue={selectedProduct.p_desc} />
        </Modal>
      )}
      <div className='p-5 m-5 bg-white shadow rounded'>
        {loading&&(<div className='w-full h-screen flex justify-center items-center'>
          <h1 className='text-xl'>loading...</h1>
        </div>)}
        {productList!==null&&loading===false&&productList.length<1&&(<div className='w-full h-screen flex justify-center items-center'>
          <h1 className='text-xl'>No product found</h1>
        </div>)}
        {
          productList!==null&&loading===false&&productList.length>0&&(
            <table className='w-full text-center'>
          <thead className='bg-slate-900 text-white'>
            <tr>
              <th className='p-3'>Name</th>
              <th className='p-3'>Image</th>
              <th className='p-3'>Category</th>
              <th className='p-3'>Description</th>
              <th className='p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                productList.map((item,i)=><tr key={i} className='even:bg-slate-100 odd:hover:bg-slate-50'>
                  <td className='p-2'>{item.p_name}</td>
                  <td className='p-2'><img src={`${API_DOMAIN}/${item.p_image}`} className='h-[50px] w-auto' /></td>
                  <td className='p-2'>{item.p_category}</td>
                  <td className='p-2'>{item.p_desc.substring(0,50)}...</td>
                  <td>
                    <button className='px-2 py-1.5 bg-green-800 hover:bg-green-900 mr-1 rounded text-white font-semibold text-sm' onClick={handleShowEditModal.bind(this,item)}>Edit</button>
                    <button className='px-2 py-1.5 bg-red-800 hover:bg-red-900 rounded text-white font-semibold text-sm' onClick={handleDeleteProduct.bind(this,item.id)}>Delete</button>
                  </td>
                </tr>)
              }
          </tbody>
        </table>
          )
      }
        {
          totalProduct!==null&&totalProduct>8&&(<div className='flex justify-end my-3'>
            <ReactPaginate 
              onPageChange={(e)=>{setPage(e.selected)}}
              previousLabel={<button className='rotate-180'><MdOutlineNavigateNext size={25} /></button>}
              nextLabel={<button><MdOutlineNavigateNext size={25} /></button>}
              className="flex items-center"
              activeClassName="bg-slate-900 text-white font-semibold"
              pageClassName="px-2 py-1 border border-slate-100 mx-1"
              nextLinkClassName=""
              previousLinkClassName=""
              pageCount={Math.ceil(totalProduct/8)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={3}
            />
        </div>)
        }
      </div>
    </>
  )
}
