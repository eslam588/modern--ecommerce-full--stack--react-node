import React ,{useRef,useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import "./SingleProduct.css"
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import Reviews from '../../components/Reviews/Reviews';
import {toast,ToastContainer } from 'react-toastify';
import {addToCart,incrementCart,decrementCart} from '../../store/cartSlice'
import 'react-toastify/dist/ReactToastify.css';



const SingleProduct = () => {

  const location = useLocation();
  const product = location.state?.product
  const {isLoggedIn} = useSelector((state)=> state.auth)
  const {itemsInCart} = useSelector((state) => state.cart);
  const [quant,setQuant] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId =JSON.parse(localStorage.getItem('userId'));
  

  useEffect(()=>{
    if(itemsInCart?.length > 0){
      let cartProduct = itemsInCart.find(item => item._id == product._id)
      setQuant(cartProduct?.quantity)
    }
  },[product,dispatch,itemsInCart])
 
  
  const addtocart =(product) => {
    dispatch(addToCart(product))
    toast.success('Added To Cart Successfly');
  }


  const imgDiv = useRef();

  const handleMouseMove = (e) =>{
    const {left , top , width , height} = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
}

  return (
    <div className='single-product container pt-3'>

       {/* product details ---------------------------------------------------------------------------------  */}

      <div className="details mx-auto">
         <h3 className="title p-2 mb-2 text-center  mb-4">{product.title}</h3>
         <div className="details-box d-lg-flex justify-content-between">
             <div className="product-img"  style={{backgroundImage:`url(${product.images[0]})`}} 
                onMouseMove={handleMouseMove}  ref={imgDiv} onMouseLeave = { () => imgDiv.current.style.backgroundPosition = `center`}>
             </div>
             <div className="product-details mt-4">
                <p><span className='fw-bold'>Description</span> : {product.description}</p>
                <p><span className='fw-bold'>category</span> : {product.category.name}</p>
                <p> <span className='fw-bold'>Price</span> : {product.price} $</p>
                <button type="button" onClick={() => dispatch(incrementCart(product))} >+</button>
                <span className="mx-3 fs-6  ">{quant || 0}</span>
                <button type="button" onClick={()=> dispatch(decrementCart(product))}>-</button>
                <div className="product-images mb-4 mt-3">
                {   
                    product.images.length>1 &&  product.images.map((img,index)=>{
                    return(
                        <img src={img} key={index} alt="" width="75px" height="75px" border="1" className="m-2"/> 
                    )
                 })
                }
                 </div>
                <Button variant="outlined" sx={{backgroundColor:"RGB(1, 61, 41)" , color:"white" , '&:hover': {background: 'light' , color:"black" , borderColor:"RGB(1, 61, 41)" }}}  onClick={() => addtocart(product)} >Add To Cart</Button>
               
             </div>
         </div>
      </div>  
      <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />  

      {/*reviews section ------------------------------------------------------------------------------------- */}
      
      <Reviews productId={product._id} />
     
    </div> 
  )
}

export default SingleProduct






























