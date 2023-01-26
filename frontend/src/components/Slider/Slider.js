import React,{useRef} from 'react'
import "./Slider.css"
import { Rerousel } from 'rerousel';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100%/3);
    height: 80px;
    font-family: Signika;
    font-weight: bold;
    font-size: 1.5em;
    border: solid 1px black;
    background-color:#000;
    color:#cecece;
    
    @media(max-width: 1150px) {
        width: 100%
    }
  `;
const Slider = () => {
  const ref = useRef(null);


  return (
    <div>
      <div className="slider d-flex justify-content-center align-items-center">
          <div className='slider-layout mt-5'>
            <div className='d-flex justify-content-center align-items-center mb-5'>
                  <div className='text-center mb-5'>
                      <p className='text-light fs-2 mb-5'>Fashonasta  store</p>
                      <NavLink to="/products">
                        <button className='shopping-btn text-white p-3'>Shopping Now</button>
                      </NavLink>
                  </div>
            </div>
          </div>
      </div>
      <Rerousel itemRef={ref}>
      <Item ref={ref}>Shoses</Item>
      <Item>Watches</Item>
      <Item>Electronics</Item>
      <Item>t-shirts</Item>
      <Item>clothes</Item>
      </Rerousel>
    </div>
  
  )
}

export default Slider