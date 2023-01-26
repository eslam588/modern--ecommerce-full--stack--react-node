const productModel= require('../models/product.model');
const CartModel = require('../models/cart.model');
const mongoose = require('mongoose');

class Cart {

    // add  item to cart ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    static addCartItem = async(req,res) => {
        try{
            let customerCart = await CartModel.findOne({userId:req.body.id}).populate('products.productId')
            const product = await productModel.findById(req.body.productId);
            if(!customerCart) {
                const price = req.body.quantity * product.price;
                customerCart =  new CartModel({userId:req.body.id,products:[req.body],cartPrice:price,totalItems:req.body.quantity});
                await customerCart.save();
                return res.status(201).send("product added in cart");
            }
            const productInCart = customerCart.products.find(cartItem => cartItem.productId._id.toString() == req.body.productId);
            if(!productInCart){
                customerCart.products.push({productId:req.body.productId,quantity:req.body.quantity});
            }
            else{
                productInCart.quantity += req.body.quantity;
            }
            customerCart.cartPrice += req.body.quantity * product.price;
            console.log(customerCart.totalItems);
            customerCart.totalItems += req.body.quantity
            await customerCart.save();
             res.send(customerCart); 
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})     
        }
    }

    // get allCartItems for authentication user ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    static getAllCartItems = async(req,res) => {
        try {
            const cart = await CartModel.findOne({userId:req.params.id}).populate('products.productId')
            if (!cart) return res.status(404).send({error:'Products Not found',code:404});
            res.send(cart);
        } catch (e) {
            res.status(400).send({error:e.message,code:400});
        }
    }


     // update CartItems for authentication user ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    
     static updateCart = async(req,res)=> {
        try{
            let quantity = Number(req.query.quantity)
            const customerCart = await CartModel.findOne({userId:req.query.id}).populate('products.productId')
            const updateproduct = customerCart.products.find(cartItem => cartItem.productId._id.toString() == req.query.productId);
            if(!updateproduct) return res.status(404).send({error:'products not found',code:404});
            customerCart.cartPrice += (quantity - updateproduct.quantity) * updateproduct.productId.price;
            customerCart.totalItems += (quantity - updateproduct.quantity)
            updateproduct.quantity = quantity;
            await customerCart.save();
            res.send(customerCart);
        }catch (e){
            res.status(400).send({error:e.message,code:400});
        }
    }
    
    // delete product from cart
    static deleteCartProduct = async (req,res)=>{
        try{

            const customerCart = await CartModel.findOne({userId:req.query.id}).populate('products.productId');
            const toDeleteIndex = customerCart.products.findIndex( cartItem => cartItem.productId._id.toString() === req.query.productId);
            if(toDeleteIndex === -1) return res.status(404).send({error:'product Not found',code:404});
            const toDeleteProduct = customerCart.products[toDeleteIndex];
            customerCart.cartPrice -= toDeleteProduct.quantity * toDeleteProduct.productId.price;
            customerCart.products.splice(toDeleteIndex,1);
            customerCart.totalItems -= toDeleteProduct.quantity
            await customerCart.save();
            res.send(customerCart);
        }catch (e){
            res.status(400).send({error:e.message,code:400});
        }
    }

    // delete cart products for user 

    static deleteCartProductsForUser = async (req,res)=>{
        try{
            const customerCart = await CartModel.findOne({userId:req.params.id})
            if(!customerCart) return res.status(404).send({error:'user Not found',code:404});
            console.log(customerCart._id.toString())
            var id = customerCart._id.toString();
            const Cart = await CartModel.findByIdAndDelete(id)
            await Cart.save();
            res.status(200)
        }catch (e){
            res.status(400).send({error:e.message,code:400});
        }
    }
    


}

module.exports = Cart