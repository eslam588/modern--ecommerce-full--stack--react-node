import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import authReducer from "./authSlice"
import productSlice from "./productSlice"
import orderSlice from './orderSlice'
import categorySlice from "./categorySlice"


const store = configureStore({reducer:{cart : cartReducer,auth:authReducer,product:productSlice, category:categorySlice, order:orderSlice}})

export default store;