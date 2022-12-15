import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// register request

export const registeruser = createAsyncThunk('auth/registeruser' ,async(data, thunkAPI)=> {
    const {rejectWithValue} = thunkAPI
    try{
        const res=await axios.post("http://localhost:8000/user/register",data)
        return res
    }
    catch(e){
        return rejectWithValue(e.message)
    }
}) 

// login request 

export const loginuser = createAsyncThunk('auth/loginuser' , async(data, thunkAPI)=> {
    const {rejectWithValue} = thunkAPI
    try{
        const res=await axios.post("http://localhost:8000/user/login",data)
        if(res.data?.message === "success"){
        
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("userId", JSON.stringify(res.data.data._id));
            console.log(res);
            return res 
        }  
    }
    catch(e){
        return rejectWithValue(e.response.data.message)
    }
}) 

// get data for authenticted user 

export const getuserdata = createAsyncThunk('auth/getuserdata' , async(_, thunkAPI)=> {
    const {rejectWithValue} = thunkAPI
    try{
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.get("http://localhost:8000/user/userdata",{
            headers:{
            'Authorization': token
             }
          })
        return res
    }
    catch(e){
        return rejectWithValue(e.response.data.message)

    }
})

// update  data for authenticted user 

export const updateuserdata = createAsyncThunk('auth/updateuserdata' , async(data, thunkAPI)=> {
    const {rejectWithValue} = thunkAPI
    try{
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.patch("http://localhost:8000/user/edituser",data,{
            headers:{
                'Authorization': token
            }
        })
        return res
    }
    catch(e){
        return rejectWithValue(e.response.data.message)
    }
}) 

// upload image for authenticted user 

export const uploaduserimage = createAsyncThunk('auth/uploaduserimage' , async(data, thunkAPI)=> {
    const {rejectWithValue} = thunkAPI
    try{
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.post("http://localhost:8000/user/imgUpload",data,{
            headers:{
            'Authorization': token
             }
          })
          return res
    }
    catch(e){
        return rejectWithValue(e.response.data.message)

    }
}) 

const initialState = {
  isLoggedIn:false,
  error: null,
  userData:{},
  token:JSON.parse(localStorage.getItem("token")),
  messagereg: null,
};
const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
      // logout
      logout: (state) => {
        state.token = "";
        state.isLoggedIn=false;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        state.userData={}
        
      },
    },
    extraReducers:{
        // register
        [registeruser.pending]: (state,action) => {
            state.error=null;
        },
        [registeruser.fulfilled]: (state,action) => {
            state.error=null;
            state.messagereg=action.payload.data.message
        },
        [registeruser.rejected]: (state,action) => {
          state.error=action.payload     
        },
        // login
        [loginuser.pending]: (state,action) => {
            state.error=null;
            state.error=null;
        },
        [loginuser.fulfilled]: (state,action) => {
            state.error=null;
            state.token=action.payload.data.token; 
        },
        [loginuser.rejected]: (state,action) => {
          state.error=action.payload
        },

        // get data for authenticated user 
        [getuserdata.pending]: (state,action) => {
            state.error=null;
            state.error=null;
        },
        [getuserdata.fulfilled]: (state,action) => {
            state.error=null;
            state.userData=action.payload.data.data.userdata
        },
        [getuserdata.rejected]: (state,action) => {
          state.error=action.payload
        },

        // update data for authenticated user 
        [updateuserdata.pending]: (state,action) => {
            state.error=null;
            state.error=null;
        },
        [updateuserdata.fulfilled]: (state,action) => {
            state.error=null;
            state.userData=action.payload.data.data
        },
        [updateuserdata.rejected]: (state,action) => {
            state.error=action.payload
        },

        // upload user image

         [uploaduserimage.pending]: (state,action) => {
            state.error=null;
            state.error=null;
        },
        [uploaduserimage.fulfilled]: (state,action) => {
            state.error=null;
            state.userData.profilePic=action.payload.data.data.profilePic
        },
        [uploaduserimage.rejected]: (state,action) => {
            state.error=action.payload
        },

    }
})

export const {logout} =  authSlice.actions; 
export default authSlice.reducer;
