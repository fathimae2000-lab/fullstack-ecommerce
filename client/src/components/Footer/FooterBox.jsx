import React from 'react';
import './FooterBox.scss';
import { FaSearch } from 'react-icons/fa';

function FooterBox() {
  return (
    <div className="footer-box container">
      <div className="row align-items-center gy-4">

        {/* LEFT TEXT */}
        <div className="col-lg-6 col-12 text-center text-lg-start">
          <h2 className="footer-title">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>

        {/* RIGHT INPUT + BUTTON */}
        <div className="col-lg-4 col-12 ms-lg-auto">
          <div className="d-flex flex-column gap-3">

            {/* INPUT */}
            <div className="search position-relative">
              <FaSearch className="search-icon" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="form-control"
              />
            </div>

            {/* BUTTON */}
            <button className="subscribe-btn w-100">
              Subscribe to Newsletter
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default FooterBox;