import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

//get all products

export const getproducts = createAsyncThunk('product/getproducts', async(page,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/product/getallproducts${page ? `?page=${page}`: ""}`
        const res= await axios.get(url,{
            header:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 

export const filterproducts = createAsyncThunk('product/filterproducts', async(keyword,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/product/getallproducts${keyword ? `?keyword=${keyword}`: "" }`
        const res= await axios.get(url,{
            header:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
})


export const productsreviews = createAsyncThunk('product/productsreviews', async(data,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        console.log(data);
        let url = `http://localhost:8000/product/addcomment/${data.productId}`
        const res= await axios.post(url, data.reviews ,{
            header:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 


export const getallreviews = createAsyncThunk('product/getallreviews', async(productId,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/product/getallcomments/${productId}`
        const res= await axios.get(url,{
            header:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 

//delete review

export const deletereview = createAsyncThunk('product/deletereview', async(data,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        console.log(data);
        let url = `http://localhost:8000/product/deletecomment/${data.productId}${data.reviewId ? `?reviewId=${data.reviewId}`: "" }`
        const res= await axios.delete(url,{
            header:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 


// update review
export const updatereview = createAsyncThunk('product/updatereview', async(productId,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/product/updatecomment/${productId}`
        const res= await axios.patch(url,{
            header:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 



const productSlice= createSlice({
    name:"product",
    initialState:{data:{}, error:null , isLoading:false , reviews:[]},

    extraReducers:{
        //get all products 

        [getproducts.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [getproducts.fulfilled]: (state,action) => {
            state.isLoading=false
            state.data=action.payload.data.data
        },
        [getproducts.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },
        
        // filterproducts

        [filterproducts.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [filterproducts.fulfilled]: (state,action) => {
            state.isLoading=false
            state.data=action.payload.data.data
        },
        [filterproducts.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },

        // reviews
        [productsreviews.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [productsreviews.fulfilled]: (state,action) => {
            state.isLoading=false
            state.data=action.payload.data.data
        },
        [productsreviews.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },

        // getallreviews

        [getallreviews.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [getallreviews.fulfilled]: (state,action) => {
            state.isLoading=false
            state.reviews=action.payload.data.data
        },
        [getallreviews.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },

        // delete review

        [deletereview.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [deletereview.fulfilled]: (state,action) => {
            state.isLoading=false
        },
        [deletereview.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },


        // update review 

        [updatereview.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [updatereview.fulfilled]: (state,action) => {
            state.isLoading=false
        },
        [updatereview.rejected]: (state,action) => {
            state.isLoading=false
        },



    }
})

export default productSlice.reducer;
