const router= require('express').Router();
const Category = require('../controllers/category.controller')

router.post("/createcategory",Category.createCategory);
router.get("/getallcategories",Category.getAllCategories);

module.exports=router;