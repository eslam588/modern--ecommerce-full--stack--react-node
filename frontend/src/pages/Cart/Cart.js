import React, { useEffect, useState } from 'react'
import "./Cart.css"
import {useSelector,useDispatch} from 'react-redux';
import {incrementCart,decrementCart,deleteFromCart} from '../../store/cartSlice'
import {addorder} from '../../store/orderSlice'
import { BsTrash} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import {userRequest} from "../../stripeRequestMethod"
const KEY = process.env.REACT_APP_STRIPE_KEY


const Cart = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  const {itemsInCart,cartItemsnum,totalCount} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId =JSON.parse(localStorage.getItem('userId'));
  const [stripeToken, setStripeToken] = useState(null);


  

  

  //make order
  // let orderProducts = cartproducts.map(product => ({productId:product._id , productquantiy:product.quantity})) 
  let makeOrder = async () => {
    if(userId) {
      //await dispatch(addorder({userId,"products":orderProducts,"totalproducts":totalproductscart,"totalprice":carttotalprice}))
    }
    else{
      navigate("/login")
    }
     
  }

  

  const onToken = (token) => {
    // setStripeToken(token);
  };


  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("stripe/payment",{
  //         tokenId: stripeToken.id,
  //         amount: carttotalprice,
  //       });
  //       navigate("/success", {
  //       stripeData: res.data,
  //       products: orderProducts});
  //       setTimeout(() => {
  //         navigate("/");
  //       },5000);
  //       // await dispatch(deletecartuser(userId));   
  //     } catch {}
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, orderProducts]);


  

  
  return (
    <div className="text-center mb-5">
      <div className="container">
          <h1 className="text-center fs-1 my-3">cart</h1>
          <div className="cart d-block d-lg-flex">
          <div className="items-cart d-block mx-auto w-75">
            {itemsInCart?.length > 0 ? (itemsInCart?.map(item => {
              return (
                  
                  <div className="cart-details d-lg-flex align-items-center justify-content-center  mt-5 border p-1 d-block mx-auto" >
                  <img src={item.image} alt="img" width="100px" height="100px" className="mx-5"/>
                    <p className="mx-5 fs-6">{item.title}</p>

                    <button type="button" onClick={() => dispatch(incrementCart(item))} >+</button>
                    <span className="mx-5 fs-6 ">quantity:{item.quantity}</span>
                    <button type="button" onClick={()=> dispatch(decrementCart(item))}>-</button>

                    <p className="mx-5 fs-4">{item.price*item.quantity}$</p>
                    <p className="mx-5" onClick={()=> dispatch(deleteFromCart(item))} ><BsTrash className="fs-1 mx-4 mt-2" /></p> 
                  </div> 
              )
            }
            )):<p className={`${itemsInCart.length == "0" ? "no-prod d-lg-block text-center" : "text-success fs-3 mt-5 text-center" }`}>no products in cart</p>}

            </div>
            <div className="total  border mt-5 ms-4 p-5 h-75 border-3 w-25">
              <h3>Order Details</h3>
              <p className="text-success fs-4 my-4">Total Products : {cartItemsnum} </p>
              <p className="text-success fs-4 my-4">Total Price : {totalCount}$</p>
              <button className="btn btn-primary mt-3" onClick={makeOrder}>check Out</button> 
              <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${totalCount}`}
              amount={totalCount*100}
              token={onToken}
              stripeKey={KEY}
            >
            </StripeCheckout>
              
            </div>
          </div> 
          </div>
    </div>
  )
}

export default Cart
