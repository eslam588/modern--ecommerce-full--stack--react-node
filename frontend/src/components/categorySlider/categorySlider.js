import React,{useRef} from 'react'
import { Rerousel } from 'rerousel';
import styled from 'styled-components';

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100%/3);
    height: 100px;
    font-family: Signika;
    font-weight: bold;
    font-size: 1.5em;
    border: solid 1px black;
    background-color: #ccc;
    
    @media(max-width: 1150px) {
        width: 100%
    }
  `;
const CategorySlider = () => {
  const ref = useRef(null);


  return (
    <div className="slidercategory">
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

export default CategorySlider