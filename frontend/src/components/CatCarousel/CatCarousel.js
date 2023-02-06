import React,{useRef} from 'react'
import { Rerousel } from 'rerousel';
import styled from 'styled-components';
import "./catcarousel.css"


const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100%/4);
    height: 150px;
    font-family: Signika;
    font-weight: bold;
    font-size: 1.5em;
    color:#000 !important;
    color:#cecece;
    @media(max-width: 1150px) {
        width: 100%
    }
  `;


const CatCarousel = () => {
    const ref = useRef(null);

  return (
    <div className='my-3'>
        <Rerousel itemRef={ref}>
        <Item ref={ref}>
          <img src="images/Dell-G15-5511-Gaming.jpg" />
          <p>Laptops</p>
        </Item>
        <Item>
           <img src="images/G2000-Gaming-Headset.jpg"/> 
           <p>Headphones</p>
        </Item>
        <Item>
          <img src="images/HAVIT-GAMENOTE-MS1027-Mouse.jpg"/>
          <p>Mouses</p>
        </Item>
        <Item>
           <img src="images/Huawei-CM510-Speaker.jpg"/>
           <p>Speakers</p>
        </Item>
        </Rerousel>
      </div>
  )
}

export default CatCarousel
