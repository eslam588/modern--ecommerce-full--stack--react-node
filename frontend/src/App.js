import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import HomePage from "./pages/HomePage/HomePage"
import Login from "./pages/Login/Login"
import Error from './pages/Error.js/Error'
import Cart from "./pages/Cart/Cart"
import Register from "./pages/Register/Register"
import Products from './pages/Products/Products';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import AboutUs from "./pages/AboutUs/AboutUs"
import Profile from './pages/Profile.js/Profile';
import Payment from './pages/Payment/Payment';
import {Navigate , Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux"
import {getuserdata} from "./store/authSlice"
import {getproducts} from "./store/productSlice";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Paymentsuccess from './pages/Payment/Paymentsuccess';
const stripePromise=loadStripe("pk_test_51MFIdwB05pMXvSjmZQlaI443GxwnkF1wC6kkv3NusnoIYc3oyTSdcKOwMNW9HBLddqAq68fLZU2Uy3CbZgtc0Gdh00PdcJ5qRM")


function App() {
   

  let userId =JSON.parse(localStorage.getItem('userId'));
  const {isLoggedIn} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getproducts())
    dispatch(getuserdata())
}, [])

  return (
    <Elements stripe={stripePromise}>
    <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage/>} />
          <Route path="/register" element={!isLoggedIn ? <Register/> : <HomePage/> } />
          <Route path="/login"  element={!isLoggedIn ? <Login/> : <HomePage/> } />
          <Route exact path="/products" element={<Products />} />
          {/* <Route path="/products/search/:keyword" element={token ? <Products/> : <Login/>} /> */}
          <Route exact path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />  
          <Route path="/aboutus" element={<AboutUs />} />  
          <Route path="/profile" element={isLoggedIn ?<Profile /> : <Login/>} />  
          {/* <Route path="/payment" element={isLoggedIn ?<Payment /> : <Login/>} />   */}
          {/* <Route path="/success" element={isLoggedIn ?<Paymentsuccess /> : <Login/>} />   */}

          <Route path="*" element={isLoggedIn ? <Error/> : <Login/>}/>
        </Routes>
        <Footer /> 
    </div>
    </Elements>
  );
}

export default App;

