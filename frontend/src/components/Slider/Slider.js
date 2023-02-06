import React from 'react'
import "./Slider.css"
import Carousel from 'react-bootstrap/Carousel';
import { NavLink } from 'react-router-dom';


const Slider = () => {
  return (
    <div className='slider'>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/shopping-online-shopaholics-e-commerce-e-shopping-concept.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/hero-image.webp"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/shopping-online-shopaholics-e-commerce-e-shopping-concept.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  
  )
}

export default Slider