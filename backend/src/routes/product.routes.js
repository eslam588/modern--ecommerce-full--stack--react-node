const router= require('express').Router();
const Product = require('../controllers/product.controller')
const {verifyToken,verifyTokenAndAuthUserAndAdmin} =require("../middleware/auth.middleware")

router.post("/createproduct",Product.createProduct);
router.get("/getallproducts", Product.getAllProducts);
router.get("/getrandomproducts", Product.getRandomProducts);
// router.get("/getproductsbydiscount", Product.getProductsDiscount);
router.get("/getproductsbycat", Product.getProductsByCat);
router.get("/singleproduct/:id", Product.singleProduct);
router.patch("/editproduct/:id", Product.editProduct)
router.delete("/deleteproduct/:id",Product.deleteProduct)
router.post("/addcomment/:id",Product.addComment);
router.get("/getallcomments/:id",Product.getAllComments);
router.patch("/updatecomment/:id",verifyToken,Product.updateComment);
router.delete("/deletecomment/:id",verifyToken,Product.deleteComment);
module.exports=router;



