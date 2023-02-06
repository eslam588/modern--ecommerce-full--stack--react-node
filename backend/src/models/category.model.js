const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    catId:{
        type: Number,
        required:true
    },
    catName:{
        type: String,
        trim: true,
        required: true
    },
    catImg:{
        type:String,
    } 
},{timestamps:true})


const Category = mongoose.model("Category",CategorySchema)
module.exports = Category;

