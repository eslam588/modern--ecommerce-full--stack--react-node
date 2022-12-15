import React, {useState} from 'react'
import joi from "joi";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NavLink , useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {registeruser} from "../../store/authSlice"
import "./Register.css";


const Register = () => {
  const {error,messagereg} = useSelector((state)=> state.auth)
  const dispatch = useDispatch();

  // inial values ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  const [values , setValues] = useState({
    username: "", 
    email:"", 
    password:"",
    // confirmpassword:"",
  });
  const [errors , setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [focusedusername , setFocusedUsername] = useState(false);
  const [focusedemail , setFocusedEmail] = useState(false);
  const [focusedpass , setFocusedPass] = useState(false);
  // const [focusedconpass , setFocusedConPass] = useState(false);
  let navigate = useNavigate();

  // update values and show errors in case change ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

  const onchange = (e) =>{
    validate();
    setValues({...values , [e.target.name]:e.target.value});
   }


   
  //use schema to validate ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

  function validation(user) {
    // const exp = values.password;
    let schema = joi.object({
    // username ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    username:joi.string().required().min(6).max(20)
    .pattern(/^[A-Za-z]/)
    .messages({"string.empty":"Please enter your username",
               "string.min": "Min length must be at least 6 char",
               "string.max": "Max length must be at less than 20 char",
               "string.pattern.base":"please enter valid username"
              }),

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

    //confirm password ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    // confirmpassword : joi.string().required().min(6).max(20)
    // .pattern(new RegExp(exp))
    // .messages({
    //   "string.pattern.base":"password dont matched",
    //   "string.empty": "Please enter your password",
    // }),
    });
    return schema.validate(user , { abortEarly: false });
  }
  
  // validate function ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

  const validate = () => {
    const errors={}
    const res = validation(values);
    if(res.error == null){
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
  }
 
  // submitted form ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

  const onhandlesubmit = (e) => {
      e.preventDefault();
      setSubmitted(true)
      let errors = validate();
      if(errors == null) {
          setValues({
            username: "", 
            email:"", 
            password:"",
            confirmpassword:""
       })
        setSubmitted(false)
        setFocusedUsername(false);
        setFocusedEmail(false);
        setFocusedPass(false)
        // setFocusedConPass(false)
        dispatch(registeruser(values))
        setTimeout(() => {
            navigate("/login")
        }, 2000);
        
      }
      else{

        console.log("errors found");
      }
}


  return (
    <div className="register-page p-2 d-flex align-items-center justify-content-center"> 
        <form className="register-form px-6 py-3 " onSubmit={onhandlesubmit}>  
            <h3 className="text-center mb-4">Register</h3>
            {/* {
               submitted  && errors=={} && <p className="text-center text-success fs-6  p-1">{messagereg}</p> 
            }  */}
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '35ch' }}} noValidate autoComplete="off" >
              <TextField id="filled-basic" label="Username" variant="filled" name="username" value={values.username} 
              onChange={onchange} className={( submitted || focusedusername) && errors.username ? "border border-2 border-danger" : ""}  
              onFocus={() => setFocusedUsername(true)}
              onBlur={() => setFocusedUsername(false)} />
            </Box>
            { (submitted || focusedusername) && errors.username  ? (
              <p className="text-danger">
                 {errors.username}
               </p>
            ): <p className="p-2"></p>}
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '35ch' },}} noValidate autoComplete="off">
              <TextField id="filled-basic" label="Email Address" variant="filled" name="email" value={values.email} 
              onChange={onchange} className={(submitted || focusedemail) && errors.email ? "border border-2 border-danger" : ""}
              onFocus={() => setFocusedEmail(true)} 
              onBlur={() => setFocusedEmail(false)} />
            </Box>
            { (submitted || focusedemail) && errors.email ? (
              <p className="text-danger">
                 {errors.email}
               </p>
            ): <p className="p-2"></p>}
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '35ch' },}} noValidate autoComplete="off">
              <TextField id="filled-basic" label="Password" variant="filled" name="password" value={values.password} 
              onChange={onchange} className={(submitted || focusedpass) && errors.password ? "border border-2 border-danger" : ""} 
              onFocus={() => setFocusedPass(true)} type="password"
              onBlur={() => setFocusedPass(false)} />
            </Box>
            { (submitted || focusedpass) && errors.password ? (
              <p className="text-danger">
                 {errors.password}
               </p>
            ): <p className="p-2"></p>}
            {/* <Box component="form" sx={{'& > :not(style)': { m: 1, width: '35ch' },}} noValidate autoComplete="off">
              <TextField id="filled-basic" label="Confirm Password" variant="filled" name="confirmpassword" type="password" 
               value={values.confirmpassword} onChange={onchange} className={(submitted || focusedconpass) && 
               errors.confirmpassword ? "border border-2 border-danger" : ""} onFocus={() => setFocusedConPass(true)} 
               onBlur={() => setFocusedConPass(false)}/>
            </Box>
            {(submitted || focusedconpass) && errors.confirmpassword ? (
              <p className="text-danger">
                 {errors.confirmpassword}
               </p>
            ): <p className="p-2"></p>} */}
            <Button variant="contained" color="success" type="submit" fullWidth="true" sx={{my:2}}  >create my new account</Button>
            <p className="text-center">alReady Registered ? <NavLink to="/login"><span className="text-light">Login Now</span></NavLink></p>
        </form> 
    </div>
  )
}

export default Register







