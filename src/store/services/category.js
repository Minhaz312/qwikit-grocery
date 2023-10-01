import { API_URL } from '@/constants';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
export const categoryApi = createApi({
    reducerPath:"categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${API_URL}/category`
    }),
    endpoints:builder=>({
        getAllCategory:builder.query({
            query:()=>({
                url:`/get/all`,
                method:"GET"
            })
        }),
        addNewCategory:builder.mutation({
            query:(data)=>({
                url:"/add",
                method:"POST",
                body:data
            })
        }),
        deleteCateogry:builder.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:"DELETE"
            })
        }),
        updateCateogry:builder.mutation({
            query:(data)=>({
                url:'/update',
                method:"PUT",
                body:data
            })
        })
    })
})

export const { useGetAllCategoryQuery, useAddNewCategoryMutation, useDeleteCateogryMutation, useUpdateCateogryMutation } = categoryApi;