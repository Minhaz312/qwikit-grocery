import { API_URL } from "@/constants"

const url = API_URL+"/product"
export const getPaginatedProduct = async (page=0) => {
    console.log('found page: ',page)
    const res = await fetch(`${url}/get/page/${page}`,{cache:"no-cache"})
    return await res.json()
}

export const addNewProduct = async (data) => {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
        formData.append(key,value)
    }
    const res = await fetch(`${url}/add`,{
        method:"POST",
        body:formData
    })
    return await res.json()
}
export const deleteProductById = async (id) => {
    const res = await fetch(`${url}/delete/${id}`,{
        method:"DELETE"
    })
    return await res.json()
}

export const searchProductByKeyword = async (keyword,page=0) => {
    const res = await fetch(`${url}/search/${keyword}/page/${page}`)
    return await res.json()
}

export const filterProductByPrice = (keyword,page,cb) => {
    fetch(`${url}/filter-by/price`,{
        method:"POST",
        body:{from,to,page}
    }).then(res=>res.json()).then(res=>{
        cb(null,res)
    }).catch(err=>{
        cb(err,null)
    })
}

export const filterProductByCategory = async (category,page=0) => {
    const res = await fetch(`${url}/filter-by/category/${category}/page/${page}`)
    return await res.json()
}
