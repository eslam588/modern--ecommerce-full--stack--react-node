const express=require("express");
const path= require('path');
const cors = require('cors');
require("dotenv").config()
require("./src/database/connection")

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRoutes = require('./src/routes/user.routes')
const productRoutes = require('./src/routes/product.routes')
const cartRoutes = require('./src/routes/cart.routes')
const orderRoutes = require('./src/routes/order.routes')


app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart" , cartRoutes);
// app.use("/order", orderRoutes);

const port= process.env.PORT || 5000;
app.listen(port , console.log(`server started listen at port ${port} successfully ..................`));