import React from 'react'
import "./Footer.css"



const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='row m-5'>
            <div className='col-12 col-md-6 col-lg-3 text-start'>
              <h5 className='mb-4'>Fachonista</h5>
              <p>The customer is at the heart of our unique business model.</p>
              <p>Pay Securely With</p>
              <p><img src='../images/payment.png' /></p>
            </div>
            <div className='col-12 col-md-6 col-lg-3 text-start'>
              <h5 className='mb-4'>SHOPPING</h5>
              <p>Clothing Store</p>
              <p>Trending Shoes</p>
              <p>Accessories</p>
              <p>Sale</p>
            </div>
            <div className='col-12 col-md-6 col-lg-3 text-start'>
              <h5 className='mb-4'>Get to Know Us</h5>
              <p>Contact Us</p>
              <p>Payment Methods</p>
              <p>Delivary</p>
              <p>Return & Exchanges</p>
              
            </div>
            <div className='col-12 col-md-6 col-lg-3 text-start'>
              <h5 className='mb-4'>NEWLETTER</h5>
              <p>Be the first to know about new arrivals, look books, sales & promos!</p>
              <p>Eternity Bands Do Last Forever ,The Health Benefits Of Sunglasses</p>
            </div>  
        </div>
        <hr className='bg-success'/>
        <h5> © Copyright FASHIONISTA. All Rights Reserved</h5>        
      </div>
     
    </div>
  )
}

export default Footer