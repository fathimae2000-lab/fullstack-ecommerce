import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../productAPI/ProductSlice'
export const store=configureStore({
    reducer:{
        product:productReducer
        
    }
})

