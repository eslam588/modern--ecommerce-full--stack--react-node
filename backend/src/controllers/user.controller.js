const userModel = require('../models/user.model')
class User {
    
    // register ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    static register = async (req,res) => {
        try{
            const userData= new userModel(req.body);
            await userData.save();
            res.status(200).send({apiStatus:true , data:userData , message:"User Registered" })
            
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})
        }
    }

    // login ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

     static login = async (req,res) => {
        try{
            const userData = await userModel.login(req.body.email , req.body.password)
            const token = await userData.generateToken();
            res.status(200).send({apiStatus:true , data:userData , token:token , message:"success"})
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e, message:e.message})
        }
     }
     // profile ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

     static userData = (req,res)=>{
        try{
            
            res.status(200).send({apiStatus:true , data:{userdata:req.user,token:req.token} , message:"fetched userdata"})
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})
        }
       
    }

     // get all users ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

     static getAllUsers = async (req,res) => {
        try{
            const allusers = await userModel.find({});
            res.status(200).send({apiStatus:true , data:allusers , message:"fetch all users"})
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})
        }
     }

     // get single user  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

     static singleUser = async (req,res) => {
        try{
            const user = await userModel.findById(req.params.id)
            res.status(200).send({apiStatus:true , data:user , message:"fetch single user"})
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e ,message:e.message})
        }
     }


     // edit user ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

      static editUser = async(req,res) => {
        try{
            const allowedEdits = ["username","email","profilePic","password"]
            const keys = Object.keys(req.body)  //return array included keys to iterate 
            const valid = keys.every(el=> allowedEdits.includes(el))
            if(!valid) throw new Error("invalid edit keys")
            keys.forEach(k=> req.user[k]= req.body[k])
            await req.user.save()
            res.status(200).send({apiStatus:true, data:req.user, MessageEvent:"done"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
      }
     
      // upload image ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

      static addImg = async (req,res)=>{
        try{
             req.user.profilePic = req.file.path.replace("public\\","");
             await req.user.save()
             res.status(200).send({apiStatus:true, data:req.user, MessageEvent:"done"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }
    

    // logout ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

     static logOut = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(t=> t.token != req.token)
            await req.user.save()
            res.status(200).send({apiStatus:true, data:[], message:"user logged out"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }

}


module.exports = User;