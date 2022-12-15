import React, {useState} from 'react'
import joi from "joi";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NavLink , useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {loginuser} from "../../store/authSlice"
import "./Login.css"
const Login = () => {

 const {error} = useSelector((state)=> state.auth)
 const dispatch = useDispatch();
 let navigate = useNavigate();

 // inial values ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const [values , setValues] = useState({
  email:"", 
  password:"",
});
const [errors , setErrors] = useState({})
const [submitted, setSubmitted] = useState(false)
const [focusedemail , setFocusedEmail] = useState(false);
const [focusedpass , setFocusedPass] = useState(false);


// update values and show errors in case change ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const onchange = (e) =>{
  setValues({...values , [e.target.name]:e.target.value});
  validate();
 }
 
//use schema to validate ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

function validation(user) {
  let schema = joi.object({
  //email ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  email:joi.string().required()
  .email({tlds:{allow: false}}).messages({
    "string.empty": "Please enter your email",
    "string.email": "Please enter valid email",
  }),

  // password ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  password : joi.string().required().min(6).max(20)
  .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/)
  .messages({
    "string.empty": "Please enter your password",
    "string.pattern.base":"please enter valid password",
    "string.min": "Min length must be at least 6 char",
    "string.max": "Max length must be at less than 20 char"
  }),
});
  return schema.validate(user , { abortEarly: false });
}

// validate function ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const validate = () => {
  const errors={}
  const res = validation(values);
  if(res.error == null ){
     setErrors ({})   
     return null
   }
   else{
      for (const error of res.error.details) {
        errors[error.path]=error.message
      }
      setErrors(errors)
      return errors;
   }
   return null;
}

// submitted form ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const onhandlesubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    let errors = validate();
    if(errors == null){
      let res = await dispatch(loginuser(values))

      if(res.payload.data.message=="success"){
          setValues({ 
            email:"", 
            password:"",
        })
        setSubmitted(false)
        setFocusedEmail(false)
        setFocusedPass(false)
        navigate("/")
      }
    }
    else{
      console.log("errors found");
    }
}


return (
  <div className="register-page p-2 d-flex align-items-center justify-content-center"> 
      <form className="register-form px-6 py-5 " onSubmit={onhandlesubmit}>  
          
          <h3 className="text-center mb-4">Sign In</h3>    
          {
              submitted  && error != null  && <p className="text-danger  fs-5 m-4 text-center">invalid email or password</p>
          } 
          <Box component="form" sx={{'& > :not(style)': { m: 1, width: '35ch' },}} noValidate autoComplete="off">
            <TextField id="filled-basic" label="Email Address" variant="filled" name="email" value={values.email} 
            onChange={onchange} className={(submitted || focusedemail) && errors.email ? "border border-2 border-danger" : ""}
            onFocus={() => setFocusedEmail(true)}
            onBlur={() => setFocusedEmail(false)}  />
          </Box>
          { (submitted || focusedemail) && errors.email ? (
            <p className="text-danger">
               {errors.email}
             </p>
          ): <p className="p-2"></p>}
          <Box component="form" sx={{'& > :not(style)': { m: 1, width: '35ch' },}} noValidate autoComplete="off">
            <TextField id="filled-basic" label="Password" variant="filled" name="password" value={values.password} 
            onChange={onchange} className={(submitted || focusedpass) && errors.password  ? "border border-2 border-danger" : ""} 
            onFocus={() => setFocusedPass(true)} onBlur={() => setFocusedPass(false)} type="password"  
            />
          </Box>
          { (submitted || focusedpass) && errors.password ? (
            <p className="text-danger">
               {errors.password}
             </p>
          ): <p className="p-2"></p>}
          <Button variant="contained" color="success" type="submit" fullWidth="true" sx={{my:2}}  >Sign In</Button>
          <p className="text-center">if dont Registered ? <NavLink to="/register"><span className="text-light">Register Now</span></NavLink></p>
      </form> 
  </div>
)
}

export default Login




















// const onhandlesubmit = async (e) => {
//   e.preventDefault();
//   setSubmitted(true)
//   let errors = validate();
//   let res = await dispatch(loginuser(values))
//   if(res.payload.data.message=="success" && errors == null){
//     setValues({ 
//         email:"", 
//         password:"",
//     })
//     setSubmitted(false)
//     setFocusedEmail(false)
//     setFocusedPass(false)
//     navigate("/")
//   }
//   else{
//     console.log("errors found");
//   }
// }