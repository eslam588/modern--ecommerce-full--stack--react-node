import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const addtocart = createAsyncThunk('cart/addtocart', async(cartproduct,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/cart/newcart`
        const res= await axios.post(url,cartproduct)
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 

export const getallcartproducts = createAsyncThunk('cart/getallcartproducts', async(userId,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/cart/allcartitems/${userId}`
        const res= await axios.get(url)
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 

export const deletecartproduct = createAsyncThunk('cart/deletecartproduct', async(data,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/cart/deletecart${data.id ? `?id=${data.id}` : ""}${data.productId ? `&productId=${data.productId}` : ""}`
        const res= await axios.delete(url)
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 


export const updatecartproduct = createAsyncThunk('cart/updatecartproduct', async(data,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/cart/updatecart${data.id ? `?id=${data.id}` : ""}${data.productId ? `&productId=${data.productId}` : ""}${data.quantity ? `&quantity=${data.quantity}` : ""}`
        const res= await axios.patch(url)
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 


const initialState={cartproducts:[],carttotalprice:0,message:null,totalproductscart:"0"}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    extraReducers:{

        [addtocart.pending]: (state,action) => {
            state.error=null
        },
        [addtocart.fulfilled]: (state,action) => {
            state.data=action.payload.data.data
            state.totalproductscart=action.payload.data.totalItems
        },
        [addtocart.rejected]: (state,action) => {
            state.error=action.payload    
        },

        /////////////////////////////

        [getallcartproducts.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [getallcartproducts.fulfilled]: (state,action) => {
            state.isLoading=false
            state.carttotalprice=action.payload.data.cartPrice
            state.cartproducts=action.payload.data.products
            state.totalproductscart=action.payload.data.totalItems
        },
        [getallcartproducts.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },

        
        ////////////////////////////
        
        [deletecartproduct.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [deletecartproduct.fulfilled]: (state,action) => {
            state.isLoading=false
            state.cartproducts=action.payload.data.products
            state.carttotalprice=action.payload.data.cartPrice
            state.totalproductscart=action.payload.data.totalItems
        },
        [deletecartproduct.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },

        ///////////////////////////
        [updatecartproduct.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [updatecartproduct.fulfilled]: (state,action) => {
            state.isLoading=false
            state.cartproducts=action.payload.data.products
            state.carttotalprice=action.payload.data.cartPrice
            state.totalproductscart=action.payload.data.totalItems
        },
        [updatecartproduct.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },
    }
})

export default cartSlice.reducer;