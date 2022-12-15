const router= require('express').Router();
const Product = require('../controllers/product.controller')
const {verifyToken} =require("../middleware/auth.middleware")

router.post("/createproduct",Product.createProduct);
router.get("/getallproducts", Product.getAllProducts);
router.get("/singleproduct/:id", Product.singleProduct);
router.patch("/editproduct/:id", Product.editProduct)
router.delete("/deleteproduct/:id", Product.deleteProduct)
router.post("/addcomment/:id", Product.addComment);
router.get("/getallcomments/:id", Product.getAllComments);
router.patch("/updatecomment/:id", Product.updateComment);
router.delete("/deletecomment/:id", Product.deleteComment);
module.exports=router;



