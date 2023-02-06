import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

//get all products

export const getproducts = createAsyncThunk('product/getproducts', async({keyword,page,categoriesname},thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        console.log(categoriesname)
        let url = `http://localhost:8000/product/getallproducts${page ? `?page=${page}`: ""}${keyword ? `&keyword=${keyword}`: ""}${categoriesname ? `&catName=${categoriesname}`: ""}`
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


//get random products

export const getrandomproducts = createAsyncThunk('product/getrandomproducts', async(thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/product/getrandomproducts`
        const res= await axios.get(url,{
            header:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        console.log(res)
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 

//get all products

export const getproductsbycat = createAsyncThunk('product/getproductsbycat',async(catName,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        console.log(catName)
        let url = `http://localhost:8000/product/getproductsbycat${catName ? `?catName=${catName}`: ""}`
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

// export const getproductsbydiscount = createAsyncThunk('product/getproductsbydiscount',async(thunkAPI) => {
//     const {rejectWithValue} = thunkAPI
//     try{
//         let url = `http://localhost:8000/product/getproductsbydiscount`
//         const res= await axios.get(url,{
//             header:{
//                 'Content-type': 'application/json; charset=UTF-8'
//             }
//         })
//         return res
//     }
//     catch(e){
//         return rejectWithValue(e.message)
//     }
// }) 


export const productsreviews = createAsyncThunk('product/productsreviews', async(data,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        const token = JSON.parse(localStorage.getItem("token"));
        let url = `http://localhost:8000/product/addcomment/${data.productId}`
        const res= await axios.post(url, data.reviews ,{
            headers:{
                'Authorization': token
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
        const token = JSON.parse(localStorage.getItem("token"));
        let url = `http://localhost:8000/product/getallcomments/${productId}`
        const res= await axios.get(url,{
            headers:{
                'Authorization': token
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
        const token = JSON.parse(localStorage.getItem("token"));
        let url = `http://localhost:8000/product/deletecomment/${data.productId}${data.reviewId ? `?reviewId=${data.reviewId}`: "" }`
        const res= await axios.delete(url,{
            headers:{
                'Authorization': token
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
        const token = JSON.parse(localStorage.getItem("token"));
        let url = `http://localhost:8000/product/updatecomment/${productId}`
        const res= await axios.patch(url,{
            headers:{
                'Authorization': token
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
    initialState:{data:{},randomproducts:{},salesproducts:{},productsbycat:{},error:null,isLoading:false,reviews:[]},

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
        
        // get random products
        [getrandomproducts.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [getrandomproducts.fulfilled]: (state,action) => {
            state.isLoading=false
            console.log(action.payload.data.data)
            state.randomproducts=action.payload.data.data
        },
        [getrandomproducts.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },

        

        //get products by category

        [getproductsbycat.pending]: (state,action) => {
            state.isLoading=true
            state.error=null

        },
        [getproductsbycat.fulfilled]: (state,action) => {
            state.isLoading=false
            state.productsbycat=action.payload.data.data
        },
        [getproductsbycat.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        },
     
        //getproductsbydiscount

        // [getproductsbydiscount.pending]: (state,action) => {
        //     state.isLoading=true
        //     state.error=null

        // },
        // [getproductsbydiscount.fulfilled]: (state,action) => {
        //     state.isLoading=false
        //     state.salesproducts=action.payload.data.data
        // },
        // [getproductsbydiscount.rejected]: (state,action) => {
        //     state.isLoading=false
        //     state.error=action.payload    
        // },

        
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
