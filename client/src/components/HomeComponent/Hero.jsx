import React from 'react'
import './Hero.scss';
import lineImg from '../../assets/images/Line 9.png';
import heroImg from '../../assets/images/b26fea69ccfd8aa5825862cdb9604a4fb4930464.jpg'


const Hero = () => {
  return (
   <>
 <div className='main row '>

  {/* LEFT */}
 <div className='left col-12 col-md-6 d-flex flex-column justify-content-center align-items-start p-1 p-md-5'>
  <h1 className="hero-title display-6 display-md-4 text-center text-md-start">
    FIND CLOTHES THAT MATCHES YOUR STYLE
  </h1>

  <div className='hero-content my-3 text-center text-md-start'>
    <span>
      Browse through our diverse range of meticulously crafted garments,
      designed to bring out your individuality and cater to your sense of style.
    </span>
  </div>
<div className='btn mt-3 w-100 d-flex justify-content-center justify-content-md-start'>
  <button className="btn btn-dark btn-lg px-4 px-md-5">
    Shop Now
  </button>
</div>
   <div className="numbers d-flex flex-wrap align-items-center justify-content-center gap-3">
  <div className="num d-flex flex-column text-center">
    <h2>200+</h2>
    <p>International Brands</p>
  </div>

  <img className="line-img d-none d-sm-block" src={lineImg} alt="line" />

  <div className="num d-flex flex-column text-center">
    <h2>2,000+</h2>
    <p>High-Quality Products</p>
  </div>

  <img className="line-img d-none d-sm-block" src={lineImg} alt="line" />

  <div className="num d-flex flex-column text-center">
    <h2>30,000+</h2>
    <p>Happy Customers</p>
  </div>
</div>
  </div>

  {/* RIGHT */}
  <div className="right col-12 col-md-6 text-center">
    <img className='image img-fluid' src={heroImg} alt="hero" />
  </div>
</div>


   </>
  )
}

export default Hero