import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import authReducer from "./authSlice"
import productSlice from "./productSlice"


const store = configureStore({reducer:{cart : cartReducer, auth:authReducer , product:productSlice}})

export default store;