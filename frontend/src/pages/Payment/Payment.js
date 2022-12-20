import React from 'react'
import {CardElement,Elements,useStripe,useElements} from '@stripe/react-stripe-js';
import './Payment.css'

const Payment = () => {
    
const stripe = useStripe();
const elements = useElements();

  return (
    <div className='payment'>
      <h1 className='text-center my-5'>payment</h1>
      <form className="form text-center">
        <input placeholder='enter email' />
        <br/>
        <input placeholder='enter name' />
        <br/>
        <CardElement options={{
           hidePostalCode:true,style:{
            base:{
                fontSize:'15px',
                width:'200px'
            },
            invalid:{
                color:'red'
            }
           }
         }} />
        <input type="submit" value="pay"/>
      </form>
    </div>
  )
}

export default Payment
