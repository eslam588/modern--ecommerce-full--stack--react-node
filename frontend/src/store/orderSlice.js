import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const addorder = createAsyncThunk('order/addorder' ,async(data, thunkAPI)=> {
    const {rejectWithValue} = thunkAPI
    try{
        const res=await axios.post(`http://localhost:8000/order/addorder`, data)
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 



const initialState={data:null}

const orderSlice = createSlice({
    name:"order",
    initialState,
    extraReducers:{
        
        // add new order

        [addorder.pending]: (state,action) => {
            state.error=null
        },
        [addorder.fulfilled]: (state,action) => {
            state.data=action.payload.data.data
        },
        [addorder.rejected]: (state,action) => {
            state.error=action.payload    
        }  
    }
})

export default orderSlice.reducer;