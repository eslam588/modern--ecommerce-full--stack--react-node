import React ,{useRef,useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import "./SingleProduct.css"
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import Reviews from '../../components/Reviews/Reviews';
import {toast,ToastContainer } from 'react-toastify';
import {addToCart,incrementCart,decrementCart} from '../../store/cartSlice'
import {getproductsbycat} from "../../store/productSlice"
import 'react-toastify/dist/ReactToastify.css';
import Product from "../../components/Product/Product"
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore , {Pagination,Navigation} from 'swiper/core'
// import 'swiper/components/pagination/pagination.min.css'
// import 'swiper/components/navigation/navigation.min.css'
// import 'swiper/swiper.min.css';

// SwiperCore.use([Pagination,Navigation])
import { Swiper, SwiperSlide,navigation } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay'


const SingleProduct = () => {
  
  const location = useLocation();
  const product = location.state?.product
  const {isLoggedIn} = useSelector((state)=> state.auth)
  const {itemsInCart} = useSelector((state) => state.cart);
  const {productsbycat,isLoading} = useSelector((state)=> state.product)
  const productReviews = useSelector((state) => state.product.reviews);
  const [quant,setQuant] = useState(0)
  const [indeximg,setIndexImg] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId =JSON.parse(localStorage.getItem('userId'));
  
   useEffect(() => {
    dispatch(getproductsbycat(product.categoryName))
  },[])


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
      <div className="details mx-auto">
         <h3 className="title p-2 mb-2 text-center  mb-4">{product.title}</h3>
         <div className="details-box d-lg-flex justify-content-between">
             <div className="product-img"  style={{backgroundImage:`url(${`http://localhost:8000/products/${product.images[indeximg]}`})`}} 
                onMouseMove={handleMouseMove}  ref={imgDiv} onMouseLeave = { () => imgDiv.current.style.backgroundPosition = `center`}>
             </div>
             <div className="product-details mt-4">
                <p><span className='fw-bold'>Description</span> : {product.description}</p>
                <p> <span className='fw-bold'>Category </span> : {product.categoryName}</p>
                <p> <span className='fw-bold'>Price</span> : {product.price} <sub>EGP</sub></p>
                <button type="button" onClick={() => dispatch(incrementCart(product))} >+</button>
                <span className="mx-3 fs-6  ">{quant || 0}</span>
                <button type="button" onClick={()=> dispatch(decrementCart(product))}>-</button>
                <div className="product-images mb-4 mt-3">
                {   
                    product.images.length > 1 &&  product.images.map((img,index)=>{
                    return(
                        <img src={`http://localhost:8000/products/${img}`} key={index} 
                        className={index == indeximg ? "activeImg m-2" : "m-2"}
                        alt="" width="75px" height="75px" border="1"
                        onClick={()=>setIndexImg(index)}/> 
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
        <div className="products-recommended">
            <h3 className="text-center my-4">Recommended Products</h3>
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              width={1200}
              autoplay
              navigation={true}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
                 {productsbycat.products?.length > 0 && productsbycat.products.map(product => {
                return( 
                  <SwiperSlide>
                    <Product product={product} AddToCart={()=> dispatch(addToCart(product))} />
                  </SwiperSlide>
                 )
              }) 
            } 
           </Swiper>
           <hr/>
        </div>

      {/*reviews section ------------------------------------------------------------------------------------- */}
      
      <Reviews productId={product._id} />
     
    </div> 
  )
}

export default SingleProduct






























