const OrderModel = require('../models/order.model');

class Order {

    // add  new order ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    static addOrder = async(req,res) => {
        try{    
                let customerOrder =  new OrderModel(req.body);
                await customerOrder.save();
                return res.status(200).send("Order Added");
            }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})     
        }
    }

}

module.exports = Order