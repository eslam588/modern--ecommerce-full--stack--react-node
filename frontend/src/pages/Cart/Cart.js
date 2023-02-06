import React, { useEffect, useState } from 'react'
import "./Cart.css"
import {useSelector,useDispatch} from 'react-redux';
import {incrementCart,decrementCart,deleteFromCart,removeCart} from '../../store/cartSlice'
import {addorder} from '../../store/orderSlice'
import { BsTrash} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import {userRequest} from "../../stripeRequestMethod"
const KEY = process.env.REACT_APP_STRIPE_KEY


const Cart = () => {
  
  const {itemsInCart,cartItemsnum,totalCount} = useSelector((state) => state.cart);
  const {isLoggedIn} = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId =JSON.parse(localStorage.getItem('userId'));
  const [stripeToken, setStripeToken] = useState(null);


  

  

  //make order


  // let orderProducts = cartproducts.map(product => ({productId:product._id , productquantiy:product.quantity})) 
  let cartproducts = JSON.parse(JSON.stringify(localStorage.getItem("cart")))
  console.log(cartproducts);
  let orderProducts = cartproducts.itemsInCart?.map(product => ({productId:product._id , productquantiy:product.quantity})) 
  let makeOrder = async () => {
    if(isLoggedIn) {
      await dispatch(addorder({userId,"products":orderProducts,"totalproducts":cartItemsnum,"totalprice":totalCount}))
    }
    else{
      navigate("/login")
    }
     
  }

  

  const onToken = (token) => {
    setStripeToken(token);
  };


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("stripe/payment",{
          tokenId: stripeToken.id,
          amount: totalCount,
        });
        if(res){
          dispatch(removeCart())
          navigate("/success", {
            stripeData: res.data,
            products: orderProducts}); 
        }
        
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, orderProducts]);


  

  
  return (
    <div className="text-center mb-5">
      <div className="container">
          <h1 className="text-center fs-1 my-3">cart</h1>
          <div className="cart d-block d-lg-flex">
          <div className="items-cart d-block mx-auto w-75">
            {itemsInCart?.length > 0 ? (itemsInCart?.map(item => {
              return (
                  
                  <div className="cart-details d-lg-flex align-items-center justify-content-center  mt-5 border p-1 d-block mx-auto" >
                  <img src={`http://localhost:8000/products/${item.image}`} alt="img" width="200px" height="100px" className="mx-5"/>
                    <p className="cart-product-name mx-5 fs-6">{item.title}</p>

                    <button type="button" onClick={() => dispatch(incrementCart(item))} >+</button>
                    <span className="mx-5 fs-6 ">quantity:{item.quantity}</span>
                    <button type="button" onClick={()=> dispatch(decrementCart(item))}>-</button>

                    <p className="cart-product-total mx-5 fs-4">{(item.price*item.quantity).toFixed(2)}<sub>EGP</sub></p>
                    <p className="mx-5" onClick={()=> dispatch(deleteFromCart(item))} ><BsTrash className="fs-1 mx-4 mt-2" /></p> 
                  </div> 
              )
            }
            )):<p className={`${itemsInCart.length == "0" ? "no-prod d-lg-block text-center" : "text-success fs-3 mt-5 text-center" }`}>no products in cart</p>}

            </div>
            <div className="products-total border mt-5 ms-4 py-5 h-75 border-3 ">
              <h3>Order Details</h3>
              <p className="text-success fs-4 my-4">Total Products : {cartItemsnum} </p>
              <p className="text-success fs-4 my-4">Total Price : {totalCount.toFixed(2)}<sub>EGP</sub></p>
              { 
                isLoggedIn && itemsInCart.length > 0 ?  (
                      <StripeCheckout
                      name="Fashonasta"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${totalCount}`}
                      amount={totalCount*100}
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <button className="btn btn-primary mt-3" onClick={makeOrder}>check Out</button> 
                    </StripeCheckout> 
                  ) 
                  : 
                  (
                    <button className="btn btn-primary mt-3" onClick={makeOrder}>check Out</button> 
                  )
                
              }
              
             
              
            </div>
          </div> 
          </div>
    </div>
  )
}

export default Cart
