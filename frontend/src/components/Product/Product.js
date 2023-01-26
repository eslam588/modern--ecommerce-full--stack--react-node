import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Product.css"
import {useDispatch,useSelector} from 'react-redux';
import {addToCart} from '../../store/cartSlice'
import {useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({product}) => {
window.scrollTo({ top: 0, behavior: 'smooth' })
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
                        <img src={`${product.images[0]}`} alt="img" />
                    </div>
                    <div className="card-details">
                        <h6>{product.title}</h6>
                        <p>{product.price}$</p>
                    </div>
                    </NavLink>
                    <button  className="py-1 text-white" onClick={()=>addtocart(product)}>Add To Cart</button>
            </div>
       
  );
}

export default Product
