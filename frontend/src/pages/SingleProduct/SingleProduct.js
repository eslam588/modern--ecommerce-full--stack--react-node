import React ,{useRef} from 'react'
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import "./SingleProduct.css"
import {useDispatch,useSelector} from 'react-redux';
import {addtocart} from '../../store/cartSlice'
import Reviews from '../../components/Reviews/Reviews';



const SingleProduct = () => {
  const location = useLocation();
  const product = location.state?.product

  const dispatch = useDispatch();
  let userId =JSON.parse(localStorage.getItem('userId'));
  

  const addToCart =(product_id) => {
      dispatch(addtocart({"id":userId,"productId":product_id,"quantity":1})) 
  }

  const imgDiv = useRef();

  const handleMouseMove = (e) =>{
    const {left , top , width , height} = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
}

  return (
    <div className='single-product container'>

       {/* product details ---------------------------------------------------------------------------------  */}

      <div className="details mx-auto">
         <h3 className="title p-2 mb-2 text-center">{product.title}</h3>
         <div className="details-box d-lg-flex justify-content-between">
             <div className="product-img"  style={{backgroundImage:`url(${product.images[0]})`}} 
                onMouseMove={handleMouseMove}  ref={imgDiv} onMouseLeave = { () => imgDiv.current.style.backgroundPosition = `center`}>
             </div>
             <div className="product-details mt-4">
                <p>{product.description}</p>
                <p>{product.category.name}</p>
                <p>{product.price}</p>
                {/* <div className="quantity m-2 mb-3">
                  <button className="bg-success text-light">+</button>
                  <span className="p-3">0</span>
                  <button className="bg-success text-light" >-</button>
                </div> */}
                <div className="product-images mb-5">
                {   
                    product.images.length>1 &&  product.images.map((img,index)=>{
                    return(
                        <img src={img} key={index} alt="" width="75px" height="75px" border="1" className="m-2"/> 
                    )
                 })
                }
                 </div>
                <Button variant="outlined" sx={{backgroundColor:"RGB(1, 61, 41)" , color:"white" , '&:hover': {background: 'light' , color:"black" , borderColor:"RGB(1, 61, 41)" }}} onClick={() => addToCart(product._id)}>Add To Cart</Button>
             </div>
         </div>
      </div>  

      {/*reviews section ------------------------------------------------------------------------------------- */}
      
      <Reviews productId={product._id} />
     
    </div> 
  )
}

export default SingleProduct






























