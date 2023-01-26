import React, {useState} from 'react'
import joi from "joi";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NavLink , useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {registeruser} from "../../store/authSlice"
import CircularProgress from '@mui/material/CircularProgress';
import "./Register.css";


const Register = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const {error,messagereg,messageexit} = useSelector((state)=> state.auth)
  const dispatch = useDispatch();

  // inial values ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  const [values , setValues] = useState({
    username: "", 
    email:"", 
    password:"",
  });
  const [errors , setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [registersuccess,setRegisterSuccess]= useState(false)
  const [existsuser , setExistsUser] = useState(false)
  const [focusedusername , setFocusedUsername] = useState(false);
  const [focusedemail , setFocusedEmail] = useState(false);
  const [focusedpass , setFocusedPass] = useState(false);
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
    // name,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
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
    })
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

  const onhandlesubmit = async (e) => {
      e.preventDefault();
      setSubmitted(true)
      let errors = validate();
      if(errors == null) {
            let res = await dispatch(registeruser(values))
            if(!(res.payload.data.mesg == "user exist already")){
              setValues({
                name: "", 
                email:"", 
                password:"",
              })
              setRegisterSuccess(true)
              setSubmitted(false)
              setFocusedUsername(false);
              setFocusedEmail(false);
              setFocusedPass(false)
              setTimeout(() => {
                  navigate("/login")
              }, 2000);   
            }  
            else{
              setExistsUser(true)
            } 
       }
      else{

        console.log("errors found");
      }
}


  return (
    <div className="register-page p-2 d-flex align-items-center justify-content-center"> 
        <form className="register-form px-6 py-3 " onSubmit={onhandlesubmit}>  
            <h3 className="text-center mb-4">Register</h3> 
            {
               registersuccess && <p className="text-center text-success fs-6  p-1">{messagereg}</p>
            } 
            {
               existsuser &&   <p className=" text-center text-danger fs-6  p-1">{messageexit}</p>
            }
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '35ch' }}} noValidate autoComplete="off" >
              <TextField id="filled-basic" label="Name" variant="filled" name="username" value={values.name} 
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
            <Button variant="contained" color="success" type="submit" fullWidth="true" sx={{my:2}}>
              {
                registersuccess ? <CircularProgress  disableShrink  size="25px" color="inherit"/> : "create my new account"
              }
              </Button>
            <p className="text-center">alReady Registered ? <NavLink to="/login"><span className="text-light">Login Now</span></NavLink></p>
        </form> 
    </div>
  )
}

export default Register







