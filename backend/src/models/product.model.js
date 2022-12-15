const mongoose = require('mongoose');


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
    category:{
        id:{type:Number},
        name:{type:String},
        image:{type:String}
    },
    images:{
        type:[String]
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

