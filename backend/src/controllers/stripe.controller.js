// const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(process.env.STRIPE_KEY);

class Stripe {
    static Payment = async(req,res) => {
        try{
            stripe.charges.create(
                {
                  source: req.body.tokenId,
                  amount: req.body.amount,
                  currency:"usd"
                },
                // (stripeErr,stripeRes) => {
                //   if (stripeErr) {
                //     res.status(500).send({ error: stripeErr });
                //   } else {
                //     res.status(200).send({ success: stripeRes });
                //   }
                // }
            );
            res.status(200).send({apiStatus:true , message:"payment ok" })
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})     
        }
    }
}

module.exports = Stripe;