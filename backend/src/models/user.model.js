const mongoose=require('mongoose');
const validator=require('validator');
const bycrpt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const UserSchema = mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
      },
    username:{ 
        type: String ,
        trim: true,
        required: true
    }, 
    email:{
        type: String,
        trim:true , 
        required: true,
        unique:true,
        // dropDups: true
    },
    password:{
        type: String, 
        trim:true, 
        required: true
    },
    profilePic: {
        type: String, 
        trim:true,
        default: 'defaultimage.jpg'
    },
    tokens:[
        { 
            token:{
                type: String, 
                required: true
            }
        }
    ],
    
},{timestamps:true})


// relation betwwen user model and product model ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
UserSchema.virtual("usersComments",{
    ref:"Product",
    localField:"_id",
    foreignField:"comments.userId"
})


// relation betwwen user model and cart model ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
UserSchema.virtual("usersCart", {
    ref:"Cart",
    localField:"_id",
    foreignField:"userId"
})

// to detetmind to show for users ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
UserSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.tokens
    delete data.__v
    return data
}

// hash password before store in database  in reister ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
UserSchema.pre("save" , async function () {
    if(this.isModified("password")) {
        this.password= await bycrpt.hash(this.password , 12);
    }
})


// check password logined equal or no password registration after bycrpt ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
UserSchema.statics.checkPass = async (loginedpassword,registeredpassword )=>{
    const compare = await bycrpt.compare(loginedpassword,registeredpassword)
    return compare
}


//  login ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
UserSchema.statics.login= async function (email , password) {  
    const userData=await User.findOne({ email});
    if(!userData) throw new Error("Invalid Email");
    const compare = await this.checkPass(password,userData.password)
    if(!compare) throw new Error("Invalid Password");
    if(userData.tokens.length > 1000) throw new Error("Not access login")
    return userData
}

// generate token after logined ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
UserSchema.methods.generateToken = async function(){
    var token= jwt.sign({_id: this._id}, process.env.JWT_KEY)
    this.tokens= this.tokens.concat({token})
    await this.save();
    return token;
}




const User = mongoose.model("Users",UserSchema)
module.exports=User;