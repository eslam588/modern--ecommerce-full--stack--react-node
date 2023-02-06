const express=require("express");
const path= require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config()
require("./src/database/connection")

const app = express();
let doesNotModifyBody = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  };
app.use(doesNotModifyBody);
app.use(cors());
app.use(express.static(path.join(__dirname, './public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: true}))




const userRoutes = require('./src/routes/user.routes')
const productRoutes = require('./src/routes/product.routes')
const categoryRoutes = require("./src/routes/category.routes")
const cartRoutes = require('./src/routes/cart.routes')
const orderRoutes = require('./src/routes/order.routes')
const stripeRoutes = require("./src/routes/stripe.routes");


app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/cart" , cartRoutes);
app.use("/order", orderRoutes);
app.use("/stripe", stripeRoutes )

const port= process.env.PORT || 5000;
app.listen(port , console.log(`server started listen at port ${port} successfully ..................`));