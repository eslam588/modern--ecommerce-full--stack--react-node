import React from 'react'
import './Extrashopping.css'
import { FiCreditCard ,FiTrello,FiShoppingBag,FiCodesandbox} from "react-icons/fi";

const Extrashopping = () => {
    
  return (
    <div>
         <div class="section1 py-5 text-center">
          <div class="container">
              <div class="row">
                  <div class="col-12 col-sm-6 col-lg-3 pb-2">
                      <div class="box  py-4 px-3 shadow rounded-3">
                        <p class="iconn">
                        <FiTrello/>
                        </p>
                        <h3 class="py-2">Great value items</h3>
                        <p>There's always Buyer something on sale!</p>
                      </div> 
                  </div>
                  <div class="col-12 col-sm-6 col-lg-3 pb-2">
                      <div class="box  py-4 px-3 shadow rounded-3">
                        <p class="iconn">
                         <FiShoppingBag/>
                        </p>
                        <h3 class="py-2">Worry-free shopping</h3>
                        <p>Every order has Buyer Protection coverage</p>
                      </div>  
                </div>
                <div class="col-12 col-sm-6 col-lg-3 pb-2">
                    <div class="box  py-4 px-3 shadow rounded-3">
                        <p class="iconn">
                           <FiCreditCard />
                        </p>
                        <h3 class="py-2">Safe payment</h3>
                        <p>Pay with the world's top payment methods</p>  
                    </div> 
                </div>
                <div class="col-12 col-sm-6 col-lg-3 pb-2">
                    <div class="box  py-4 px-3 shadow rounded-3">
                        <p class="iconn">
                           <FiCodesandbox/>
                        </p>
                        <h3 class="py-2">Worldwide delivery</h3>
                        <p>What you want, delivered to where you want</p> 
                    </div> 
                </div>
              </div>
          </div>

      </div>
    </div>
  )
}

export default Extrashopping