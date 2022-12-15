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
import {Navigate , Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux"
import {getuserdata} from "./store/authSlice"
import {getproducts} from "./store/productSlice";
import {getallcartproducts} from './store/cartSlice'

function App() {

  let userId =JSON.parse(localStorage.getItem('userId'));
  const {token} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getproducts())
    dispatch(getuserdata())
    dispatch(getallcartproducts(userId))
}, [])

  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={token ? <HomePage/> : <Login/>} />
          <Route path="/register" element={!token ? <Register/> : <HomePage/> } />
          <Route path="/login"  element={!token ? <Login/> : <HomePage/> } />
          <Route path="/products" element={token ? <Products /> : <Login/>} />
          <Route path="/products/search/:keyword" element={token ? <Products/> : <Login/>} />
          <Route path="/products/:id" element={token ? <SingleProduct /> : <Login/>} />
          <Route path="/cart" element={token ? <Cart /> : <Login/> } />  
          <Route path="/aboutus" element={token ? <AboutUs /> : <Login/>} />  
          <Route path="/profile" element={ token ?<Profile /> : <Login/>} />  
          <Route path="*" element={token ? <Error/> : <Login/>}/>
        </Routes>
        <Footer /> 
    </div>
  );
}

export default App;

