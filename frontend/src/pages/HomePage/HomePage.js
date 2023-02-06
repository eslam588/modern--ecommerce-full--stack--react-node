import React,{useEffect} from 'react'
import Slider from '../../components/Slider/Slider'
import Productscom from '../../components/Productscom/Productscom';
import {useSelector,useDispatch} from "react-redux"
import {getuserdata} from "../../store/authSlice";
import {getrandomproducts,getproductsbydiscount} from "../../store/productSlice";
import Extrashopping from './../../components/extrashopping/Extrashopping';
import CatCarousel from '../../components/CatCarousel/CatCarousel';
import { Link } from 'react-router-dom';
import "./homepage.css"


const HomePage = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const {randomproducts,salesproducts,isLoading, error} = useSelector((state)=> state.product)
  const dispatch = useDispatch()
  let userId =JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    dispatch(getrandomproducts({}))
    dispatch(getuserdata())
    // dispatch((getproductsbydiscount()))
  }, [])



  return (
    <div>
       <Slider />
       {/* <Extrashopping /> */}
       <CatCarousel />
       <hr className='text-success border-1 w-75 mx-auto '/>
       <div className='products-box'>
       <h3 className='text-center my-4'>Products</h3>
       <Productscom products={randomproducts?.products} isLoading={isLoading}  error={error} />
       <p className='text-center my-4'>
           <Link to="/Products">
           <span className='show-allproducts p-2 rounded'>Show All Products</span>
           </Link>
       </p>
       </div>
       
    </div>
  )
}

export default HomePage
