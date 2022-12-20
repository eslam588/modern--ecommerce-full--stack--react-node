import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Product.css"
import {useDispatch,useSelector} from 'react-redux';
import {addtocart} from '../../store/cartSlice'
import {useNavigate} from "react-router-dom";
const Product = ({product}) => {

const {isLoggedIn} = useSelector((state)=> state.auth)
const dispatch = useDispatch();
const navigate = useNavigate();

let userId =JSON.parse(localStorage.getItem('userId'));
// let token =JSON.parse(localStorage.getItem("token"))

const addToCart =(product_id) => {
    if(!isLoggedIn){
        navigate("/login")
        
    }
    dispatch(addtocart({"id":userId,"productId":product_id,"quantity":1})) 
}

return(
        <div className="col-sm-6 col-md-4 col-lg-3 ">
            <div className="card my-3 text-center mx-auto" style={{width:"250px"}}>
            
                <NavLink to={`/products/${product.id}`} state={{product}}>
                    <div className="card-img mx-auto">
                        <img src={`${product.images[0]}`} alt="img" />
                    </div>
                    <div className="card-details">
                        <h6>{product.title}</h6>
                        <p>{product.price}$</p>
                    </div>
                    </NavLink>
                    <button  className="py-1 text-white" onClick={() => addToCart(product._id)}>Add To Cart</button>
                </div>
        </div>
  );
}

export default Product
