const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true
    },
    products:[
      {
          productId: {
              type: mongoose.Schema.Types.ObjectId,
              required: true
          },
          quantity: {
              type:Number, 
              default:1
          }
      }
    ],
    totalproducts: { type: Number, required: true },
    totalprice: { type: Number, required: true },
  },{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);