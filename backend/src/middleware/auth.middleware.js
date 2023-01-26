const jwt = require('jsonwebtoken');
const userModel=require("../models/user.model")

const verifyToken = async (req, res, next) => {
    try{
        const token=req.header('Authorization').replace("bearer ", "");
        const decoded =jwt.verify(token , process.env.JWT_KEY)
        const userData= await userModel.findOne({_id:decoded._id,"tokens.token":token})
        if(!userData) throw new Error("unauthorized");
        req.token=token;
        req.user=userData;
        next();
    }
    catch(err){
        res.status(500).send({apiStatus:false, data:err, message:err.message});
    }
}

const verifyTokenAndAuthUserAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log(req.user.id);
        let userId=JSON.parse(req.query.userId)
        console.log(userId)
      if (req.user.id == req.body.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed!");
      }
    });
  };

const verifyTokenForAdmin = (req, res , next) => {
    verifyToken(req,res, () => {
        if(req.user.isAdmin) {
            next();
        }
        else{
            res.status(500).json("You are not alowed!");
        }
    });
}

module.exports={
    verifyToken,
    verifyTokenForAdmin,
    verifyTokenAndAuthUserAndAdmin
};