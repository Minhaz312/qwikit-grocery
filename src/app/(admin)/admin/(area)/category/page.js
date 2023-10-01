"use client"
import Modal from '@/components/custom-component/Modal'
import { useAddNewCategoryMutation, useDeleteCateogryMutation, useGetAllCategoryQuery, useUpdateCateogryMutation } from '@/store/services/category'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function page() {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  
  const [newCategoryName, setNewCategoryName] = useState("")

  const [selectedCategoryToUpdate, setSelectedCategoryToUpdate] = useState(null)
  const [updatedCatName,setUpdatedCatName] = useState("")

  const {data:categoryList,isLoading:categoryLoading,error,refetch} = useGetAllCategoryQuery()
  const [updateCateogry] = useUpdateCateogryMutation()

  const [addNewCategory,result] = useAddNewCategoryMutation()
  const [deleteCateogry] = useDeleteCateogryMutation()

  const handleAddNewCategory = () => {
      if(newCategoryName.trim()!==""){
        addNewCategory({name:newCategoryName});
        console.log('result: ',result)
        refetch()
      }
  }
  const handleShowUpdateCategoryModal = cat => {
    if(showUpdateModal){
      setShowUpdateModal(false)
      setSelectedCategoryToUpdate(null)
    }else{
      setSelectedCategoryToUpdate(cat)
      setShowUpdateModal(true)
    }
  }
  const handleUpdateCategory = cat => {
    if(updatedCatName.trim()!==""){
      updateCateogry({id:selectedCategoryToUpdate.id,name:updatedCatName})
      refetch()
    }
  }
  const handleDeleteCategory = cat => {
    if(confirm("Sure to delete?")){
      deleteCateogry(cat.id)
      refetch()
    }
  }

  useEffect(()=>{

  },[categoryList])

  return (
    <>
      {selectedCategoryToUpdate!==null&&(<Modal show={showUpdateModal} title="Update category" onHide={handleShowUpdateCategoryModal} onActionTitle="Update" onAction={handleUpdateCategory}>
        <input type='text' defaultValue={selectedCategoryToUpdate.name.trim()} onChange={e=>setUpdatedCatName(e.target.value)} className='px-3 py-2 bg-slate-100 w-full' placeholder='Enter category name' />
      </Modal>)}
      <div className='flex justify-center'>
      <div className='bg-white m-4 p-3 shadow rounded'>
        <div className='flex'>
          <input type='text' placeholder='Enter category name' onChange={e=>setNewCategoryName(e.target.value)} className='px-3 py-2 rounded bg-slate-100 w-full md:w-[500px] outline-none border-none focus:ring-1' />
          <button className='px-3 py-1.5 bg-green-800 rounded text-white font-semibold text-sm' onClick={handleAddNewCategory}>Add</button>
        </div>
        {categoryLoading&&(<div className='w-full h-1/2 flex justify-center items-center'>
          <h3>Loading...</h3>
        </div>)}
        {categoryList!==undefined&&categoryLoading===false&&(
          <table className='w-full text-center my-5'>
          <thead className='bg-slate-900 text-white'>
            <tr>
              <th className='p-2 text-sm'>Category Name</th>
              <th className='p-2 text-sm'>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {
              categoryList.data.map((cat,i)=><tr key={i}>
              <td className='py-3'>{cat.name}</td>
              <td className='py-3'>
                <div>
                  <button className='px-2 py-1 bg-green-800 rounded text-white font-semibold text-[12px] mr-2' onClick={handleShowUpdateCategoryModal.bind(this,cat)}>update</button>
                  <button className='px-2 py-1 bg-red-800 rounded text-white font-semibold text-[12px]' onClick={handleDeleteCategory.bind(this,cat)}>delete</button>
                </div>
              </td>
            </tr>)
            }
          </tbody> 
        </table> 
        )}
      </div>     
    </div>
    </>
  )
}
