import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Product.css"
import {useDispatch,useSelector} from 'react-redux';
import {addToCart} from '../../store/cartSlice'
import {useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({product}) => {
const {isLoggedIn} = useSelector((state)=> state.auth)
const dispatch = useDispatch();
const navigate = useNavigate();

let userId =JSON.parse(localStorage.getItem('userId'));
// let token =JSON.parse(localStorage.getItem("token"))

const addtocart =(product) => {
    dispatch(addToCart(product))
    toast.success('Added To Cart Successfly');
}

return(
    
            <div className="card my-3 text-center mx-auto">
                <NavLink to={`/products/${product._id}`} state={{product}}>
                    <div className="card-img mx-auto">
                      <img src={`http://localhost:8000/products/${product.images[0]}`} alt="img" />
                      {
                        product.discount &&  <span className='product-discount'>{product.discount}%</span>
                      }
                      
                    </div>
                    <div className="card-details">
                        <h5>{product.title}</h5>
                        {
                          product.discount ? (<p><span><del>{product.price.toFixed(2)}</del></span><span className='ms-2'>{(product.price-(product.price*product.discount/100)).toFixed(2)} <sub>EGP</sub></span></p> 
                          
                          ): <p>{product.price} <sub>EGP</sub></p>

                        }
                       
                    </div>
                    </NavLink>
                    <button  className="py-1 text-white" onClick={()=>addtocart(product)}>Add To Cart</button>
            </div>
       
  );
}

export default Product
