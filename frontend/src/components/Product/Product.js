import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Product.css"
import {useDispatch} from 'react-redux';
import {addtocart} from '../../store/cartSlice'

const Product = ({product}) => {

const dispatch = useDispatch();


let userId =JSON.parse(localStorage.getItem('userId'));


const addToCart =(product_id) => {
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
