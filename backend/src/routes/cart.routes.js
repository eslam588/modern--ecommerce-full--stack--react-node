const router= require('express').Router();
const Cart = require("../controllers/cart.controller")
const {verifyToken} =require("../middleware/auth.middleware")

router.post("/newcart",verifyToken,Cart.addCartItem);
router.get("/allcartitems/:id",verifyToken,Cart.getAllCartItems);
router.patch("/updatecart",verifyToken,Cart.updateCart);
router.delete("/deletecart",verifyToken,Cart.deleteCartProduct);

module.exports=router;





























  // //UPDATE
  // router.put("/:id", async (req, res) => {
  //   try {
  //     const updatedCart = await Cart.findByIdAndUpdate(
  //       req.params.id,
  //       {
  //         $set: req.body,
  //       },
  //       { new: true }
  //     );
  //     res.status(200).json(updatedCart);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  
  // //DELETE
  // router.delete("/:id",async (req, res) => {
  //   try {
  //     await Cart.findByIdAndDelete(req.params.id);
  //     res.status(200).json("Cart has been deleted...");
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  
  // //GET USER CART
  // router.get("/find/:userId", async (req, res) => {
  //   try {
  //     const cart = await Cart.findOne({ userId: req.params.userId });
  //     res.status(200).json(cart);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  
  // // //GET ALL
  
  // router.get("/", async (req, res) => {
  //   try {
  //     const carts = await Cart.find();
  //     res.status(200).json(carts);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });