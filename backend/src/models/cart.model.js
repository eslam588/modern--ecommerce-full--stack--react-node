const mongoose = require('mongoose');


const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    products:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required: true
            },
            quantity: {
                type:Number, 
                default:1
            } 
        }
    ],
    cartPrice: {
        type:Number,
        default:0
    },
    totalItems:{
        type:Number,
        default:0
    }
  
},{timestamps:true})


const Cart = mongoose.model("Cart",CartSchema)
module.exports = Cart;

