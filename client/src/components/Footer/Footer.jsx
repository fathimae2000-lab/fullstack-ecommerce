import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import './Footer.scss';
import FooterBox from './FooterBox';
import frameImg from '../../assets/images/Frame 53.svg'

function Footer() {
  return (
    <>
    <FooterBox/>
     <div className="footer-wrapper mt-5">
  <div className="container footer">
    <div className="row gy-4">

      {/* Logo */}
      <div className="col-lg-4 col-md-6 col-12 text-center text-md-start">
        <h2 className="logo">SHOP.CO</h2>
        <p>
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>

        <div className="social-icons d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
          <FaTwitter />
          <FaFacebook />
          <FaInstagram />
          <FaGithub />
        </div>
      </div>

      {/* Links */}
      <div className="col-lg-2 col-md-3 col-6">
        <h6>COMPANY</h6>
        <ul>
          <li>About</li>
          <li>Features</li>
          <li>Works</li>
          <li>Career</li>
        </ul>
      </div>

      <div className="col-lg-2 col-md-3 col-6">
        <h6>HELP</h6>
        <ul>
          <li>Customer Support</li>
          <li>Delivery Details</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className="col-lg-2 col-md-3 col-6">
        <h6>FAQ</h6>
        <ul>
          <li>Account</li>
          <li>Manage Deliveries</li>
          <li>Orders</li>
          <li>Payments</li>
        </ul>
      </div>

      <div className="col-lg-2 col-md-3 col-6">
        <h6>RESOURCES</h6>
        <ul>
          <li>Free Books</li>
          <li>Development Tutorial</li>
          <li>How-to Blog</li>
          <li>Youtube Playlist</li>
        </ul>
      </div>

    </div>
  </div>

  <hr />

  {/* Bottom section */}
  <div className="container">
    <div className="row copy">
      <div className="col-12 col-md-6 text-center text-md-start">
        <span>Shop.co © 2000-2023, All Rights Reserved</span>
      </div>

      <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
        <img src={frameImg} className="img-fluid" alt="img" />
      </div>
    </div>
  </div>
</div>

    
    </>
   
  );
}

export default Footer;