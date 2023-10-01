"use client"

import { addNewProduct } from "@/actions/product/getProducts"
import { useGetAllCategoryQuery } from "@/store/services/category"
import Joi from "joi"
import { useState } from "react"

export default function page() {

  const [adding, setAdding] = useState(false)

  const {data:categoryList,isLoading:categoryLoading,error,refetch} = useGetAllCategoryQuery()

  const [name,setName] = useState("")
  const [desc,setDesc] = useState("")
  const [image,setImage] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")

  const handleAddNewProduct = async () => {
    const productSchema = Joi.object({
      name:Joi.string().min(3).required(),
      desc:Joi.string().min(10).required(),
      price:Joi.number().positive().min(0).required(),
      category:Joi.string().required()
    })
    let data = {name,desc,price:Number(price),category};
    console.log('data: ',data)
    if(productSchema.validate(data).error && image===""){
      alert("Enter all field!")
    }else{
      setAdding(true)
      data.image = image
      const res = await addNewProduct(data);
      if(res){
        setAdding(false)
        setName("")
        setDesc("")
        setImage("")
        setPrice("")
        setCategory("")
        refetch()
      }
    }
  }

  return (
    <div className='m-3 p-3 bg-white rounded shadow'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <div>
            <label className='text-slate-600 text-sm'>Product Name</label>
            <input type='text' placeholder='Enter product name' value={name} onChange={e=>setName(e.target.value)} className='px-3 py-2 w-full bg-slate-100 text-slate-900 outline-none border-none text-sm mt-3' />
          </div>
          <div className='mt-5'>
            <label className='text-slate-600 text-sm'>Product Price</label>
            <input type='text' placeholder='Enter product price' value={price} onChange={e=>setPrice(e.target.value)} className='px-3 py-2 w-full bg-slate-100 text-slate-900 outline-none border-none text-sm mt-3' />
          </div>
          <div className='mt-5'>
            <label className='text-slate-600 text-sm'>Product Category</label>
            <select className='p-4 block w-full bg-slate-100 py-2 px-3 mt-3' onChange={e=>setCategory(e.target.value)}>
              <option className='bg-white py-3 mb-3'>Select Category</option>
              {categoryList!==undefined&&categoryLoading===false&&(categoryList.data.map((cat,i)=><option key={i} value={cat.name}>{cat.name}</option>))}
            </select>
          </div>
          <div className='mt-5'>
            <label className='text-slate-600 text-sm'>Product Description</label>
            <textarea type='text' value={desc} rows={10} onChange={e=>setDesc(e.target.value)} placeholder='Enter product name' className='px-3 py-2 w-full bg-slate-100 text-slate-900 outline-none border-none text-sm mt-3' />
          </div>
        </div>
        <div>
          <div>
            <label className='text-slate-600 text-sm'>Product Image</label>
            <input type='file' placeholder='Enter product name' onChange={e=>setImage(e.target.files[0])} className='px-3 py-2 w-full bg-slate-100 text-slate-900 outline-none border-none text-sm mt-3' />
          </div>
        </div>
      </div>
      <div className='flex justify-end my-3'>
        <button className='px-3 py-1.5 bg-green-800 rounded text-white font-semibold text-sm' onClick={handleAddNewProduct}>{adding?"Adding...":"Add"}</button>
      </div>
    </div>
  )
}
