import React,{useEffect} from 'react'
import Slider from '../../components/Slider/Slider'
import Productscom from '../../components/Productscom/Productscom';
import {useSelector,useDispatch} from "react-redux"
import {getuserdata} from "../../store/authSlice";
import {getproducts} from "../../store/productSlice";
import Extrashopping from './../../components/extrashopping/Extrashopping';


const HomePage = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const {data,isLoading, error} = useSelector((state)=> state.product)
  const dispatch = useDispatch()
  let userId =JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    dispatch(getproducts({}))
    dispatch(getuserdata())
  }, [])

  return (
    <div>
       <Slider />
       <Extrashopping />
       <Productscom products={data.products} isLoading={isLoading}  error={error} />
    </div>
  )
}

export default HomePage
