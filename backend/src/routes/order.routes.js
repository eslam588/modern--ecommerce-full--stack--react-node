const router= require('express').Router();
const Order = require("../controllers/order.controller");

router.post("/addorder",  Order.addOrder);

module.exports=router;