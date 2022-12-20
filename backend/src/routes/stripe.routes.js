const router= require('express').Router();
const Stripe = require('../controllers/stripe.controller')

router.post("/payment", Stripe.Payment);

module.exports=router;