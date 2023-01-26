import React ,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import joi from "joi";
import Button from '@mui/material/Button';
import {useSelector,useDispatch} from 'react-redux';
import "./Profile.css"
import {updateuserdata,uploaduserimage} from "../../store/authSlice"

const Profile = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const {userData} = useSelector((state)=> state.auth)
  const dispatch= useDispatch();
  const [updatedvalues , setUpdatedValues] = useState({
    username: userData.username, 
    email:userData.email, 
    password:userData.password
  });
  const [errors , setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validation(user) {
    let schema = joi.object({
    
    //username ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    username:joi.string().required().messages({
      "string.empty": "Please enter your username",
    }),
    
    //email ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    email:joi.string().required()
    .email({tlds:{allow: false}}).messages({
      "string.empty": "Please enter your email",
      "string.email": "Please enter valid email",
    }),
  
  });
    return schema.validate(user , { abortEarly: false });
  }

// // validate function ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const validate = () => {
  const errors={}
  const res = validation({username:updatedvalues.username,email:updatedvalues.email});
  if(res.error == null ){
     setErrors ({})   
     return null
   }
   else{
      for (const error of res.error.details) {
        errors[error.path]=error.message
      }
      setErrors(errors)
      console.log(errors)
      return errors;
   }
   return null;
}



  


  onchange=(e)=>{
    setUpdatedValues({...updatedvalues, [e.target.name]:e.target.value})
  }

  const onhandlesubmit= async (e) => {
    e.preventDefault();
    setSubmitted(true)
    let errors = validate();
    if(errors == null) {
      setSubmitted(false)
      await dispatch(updateuserdata(updatedvalues))
    }
  }


 
 const onchangeImg = async (e) => {
     let file = e.target.files[0];
     await uploadImage(file)

  }

const uploadImage = async(file) => {
       const myData= new FormData();
       myData.append("img", file , file.name)
       await dispatch(uploaduserimage(myData))
       
}



  return (
    <div className='profile-page p-2'>
        <div className="container">
            <h3 className="mb-2 p-3 text-center">Profile Setting</h3>
            <div className="profile d-flex">
                <div className="profile-part1 w-25">
                      <div className="pic text-center">
                          <img src={`http://localhost:8000/${userData.profilePic}`} width="100px" height="120px" alt="img" />
                          <br/>
                          <Button  
                            variant="contained"
                            component="label"
                            >
                            Upload
                            <input
                                name="image"
                                type="file"
                                hidden
                                onChange={onchangeImg}
                            />
                          </Button>
                          <p className="mt-3 fs-3">{userData.username}</p>
                          <p>joined {userData.createdAt}</p>
                      </div>
                </div>
                <div className="profile-part2 w-75">
                        <Box
                        component="form"
                        onSubmit={onhandlesubmit}
                        sx={{
                            '& > :not(style)': { m: 1, width: '60ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="UserName" variant="outlined" name="username" 
                                value={updatedvalues.username} onChange={onchange} />
                            <br/>
                            { submitted && errors.username ? (
                              <p className="text-danger">
                                {errors.username}
                              </p>
                            ): <p className="p-1"></p>}
                            <TextField id="outlined-basic" label="Email" variant="outlined" name="email" 
                                value={updatedvalues.email} onChange={onchange} />
                            <br/>
                            { submitted && errors.email ? (
                              <p className="text-danger">
                                {errors.email}
                              </p>
                            ): <p className="p-1"></p>}
                            
                            <TextField id="outlined-basic" label="Password" type="password"  variant="outlined" name="password" 
                                v onChange={onchange}/>
                            <br/>
                            <Button  type="submit" variant="outlined" sx={{backgroundColor: "RGB(1, 61, 41)", padding:"10px" , color:"white" , '&:hover': {backgroundColor: 'green' , color:"white"}}}>Update Profile</Button>
                        </Box>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
