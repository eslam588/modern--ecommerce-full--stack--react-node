import React from 'react'
// import {products} from "../../data";
import Product from "../Product/Product"
import "./Products.css"
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Productscom = ({products,isLoading, error}) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="products">
        <div className="container">
            {/* <p>{error}</p> */}
            {
              !isLoading ? (
                <div className="row">
                {
                    products?.length > 0 ? products.map(product => <Product product={product} />) : <p className="text-center fs-3 my-5 py-5">no products</p> 
                }
                </div>
              ) : <p className="proloading text-center mt-6">
                   <CircularProgress disableShrink  size="100px" color="success" sx={{m:6}} />
                  </p>
            }
           
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
        </div>
    </div>
  )
}

export default Productscom