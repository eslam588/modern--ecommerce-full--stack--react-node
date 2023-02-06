const mongoose = require('mongoose');
var random = require('mongoose-random');

const ProductSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categoryName:{
        type: String, 
        required:true,
        ref:"Category"
    },
    images:{
        type:[String]
    },
    discount:{
        type:Number
    },
    reviews:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Users"
            },
            commenttext:{
                type:String,
                trim:true,
                required:true
            },
            rating:{
                type: Number,
                trim:true,
                required:true
            }
        } 
    ]  
},{timestamps:true})

const Product = mongoose.model("Product",ProductSchema)
module.exports = Product;




