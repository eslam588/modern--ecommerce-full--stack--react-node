import React, { useEffect, useState } from 'react'
import "./Cart.css"
import {useSelector,useDispatch} from 'react-redux';
import {getallcartproducts,deletecartproduct,updatecartproduct} from '../../store/cartSlice'
import {addorder} from '../../store/orderSlice'
import { BsTrash} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import {userRequest} from "../../stripeRequestMethod"
const KEY = process.env.REACT_APP_STRIPE_KEY


const Cart = () => {

  const {cartproducts,carttotalprice,totalproductscart} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId =JSON.parse(localStorage.getItem('userId'));
  const [stripeToken, setStripeToken] = useState(null);

  useEffect(() => {
    dispatch(getallcartproducts(userId))
  },[dispatch,userId])


  let deleteproduct = (id) => {
    dispatch(deletecartproduct({"id":userId,"productId":id}))
  }


  let increaseQuantity =(id,quan) => {
    let quantity = quan+1;
    dispatch(updatecartproduct({"id":userId,"productId":id,"quantity":quantity}))
  }


  let decreaseQuantity =(id,quan) => {
    let quantity = quan-1;
    dispatch(updatecartproduct({"id":userId,"productId":id,"quantity":quantity}))
  }
  

  //make order
  let orderProducts = cartproducts.map(product => ({productId:product._id , productquantiy:product.quantity})) 
  let makeOrder = async() => {
    await dispatch(addorder({userId,"products":orderProducts,"totalproducts":totalproductscart,"totalprice":carttotalprice}))
    // setTimeout(() => {
    //   navigate("/payment")
    // }, 3000);
  }

  

  const onToken = (token) => {
    setStripeToken(token);
  };


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("stripe/payment",{
          tokenId: stripeToken.id,
          amount: carttotalprice,
        });
        console.log(res.data);
        navigate("/success", {
        stripeData: res.data,
       
        products: orderProducts});
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, orderProducts]);


  

  
  return (
    <div className="text-center">
      <div className="container">
          <h1 className="text-center fs-1 my-3">cart</h1>
          <div className="cart d-block d-lg-flex">
          <div className="items-cart d-block mx-auto w-75">
            {cartproducts.length > 0 ? (cartproducts.map(item => {
              return (
                  
                  <div className="cart-details d-lg-flex align-items-center justify-content-center  mt-5 border p-1 d-block mx-auto" >
                  <img src={item.productId.images[0]} alt="img" width="100px" height="100px" className="mx-5"/>
                    <p className="mx-5 fs-6">{item.productId.title}</p>

                    <button type="button"  onClick={()=> increaseQuantity(item.productId._id,item.quantity)}>+</button>
                    <span className="mx-5 fs-6 ">quantity:{item.quantity}</span>
                    <button type="button" onClick={()=> decreaseQuantity(item.productId._id,item.quantity)}>-</button>

                    <p className="mx-5 fs-4">{item.productId.price*item.quantity}$</p>
                    <p className="mx-5"><BsTrash className="fs-1 mx-4 mt-2" onClick={() => deleteproduct(item.productId._id)} /></p> 
                  </div> 
              )
            }
            )):<p className={`${cartproducts.length === "0" ? "no-prod d-lg-block text-center" : "text-success fs-3 mt-5 text-center" }`}>no products in cart</p>}

            </div>
            <div className="total  border mt-5 ms-4 p-5 h-75 border-3 w-25">
              <h3>Order Details</h3>
              <p className="text-success fs-4 my-4">Total Products : {totalproductscart} </p>
              <p className="text-success fs-4 my-4">Total Price : {carttotalprice}$</p>
              <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${carttotalprice}`}
              amount={carttotalprice*100}
              token={onToken}
              stripeKey={KEY}
            >
             <button className="btn btn-primary mt-3" onClick={makeOrder}>check Out</button> 
            </StripeCheckout>
              
            </div>
            {/* <ToastContainer className="toast-btn"/> */}
            </div> 
           </div>
    </div>
  )
}

export default Cart
