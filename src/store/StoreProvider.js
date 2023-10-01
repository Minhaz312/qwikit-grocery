import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { categoryApi } from './services/category'


const store =  configureStore({
  reducer: {
    [categoryApi.reducerPath]:categoryApi.reducer,
  },
  middleware:getDefaultMiddleware=>{
    return getDefaultMiddleware().concat(categoryApi.middleware)
  }
})

setupListeners(store.dispatch)

export default function StoreProvider({children}){
  return <Provider store={store}>{children}</Provider>
}