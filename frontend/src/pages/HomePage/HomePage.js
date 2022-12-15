import React,{useEffect} from 'react'
import Slider from '../../components/Slider/Slider'
import Productscom from '../../components/Productscom/Productscom';
import {useSelector,useDispatch} from "react-redux"
import {getuserdata} from "../../store/authSlice";
import {getproducts} from "../../store/productSlice";
import {getallcartproducts} from '../../store/cartSlice'

const HomePage = () => {
  const {data,isLoading, error} = useSelector((state)=> state.product)
  const dispatch = useDispatch()
  let userId =JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    dispatch(getproducts())
    dispatch(getuserdata())
    dispatch(getallcartproducts(userId))
  }, [])

  return (
    <div>
       <Slider />
       <Productscom products={data.products} isLoading={isLoading}  error={error} />
    </div>
  )
}

export default HomePage
