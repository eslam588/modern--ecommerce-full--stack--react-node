import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"



export const getallcategories = createAsyncThunk('category/getallcategories', async(_,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        let url = `http://localhost:8000/category/getallcategories`
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



const categorySlice= createSlice({
    name:"category",
    initialState:{data:{}, error:null , isLoading:false},
    extraReducers:{
        //get all products 
        [getallcategories.pending]: (state,action) => {
            state.isLoading=true
            state.error=null
        },
        [getallcategories.fulfilled]: (state,action) => {
            state.isLoading=false
            state.data=action.payload.data.data
        },
        [getallcategories.rejected]: (state,action) => {
            state.isLoading=false
            state.error=action.payload    
        }
    }

})

export default categorySlice.reducer;