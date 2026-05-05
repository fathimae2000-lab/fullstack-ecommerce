import React, { useState } from 'react';
import { IoClose, IoChevronDown } from 'react-icons/io5';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const [search, setSearch] = useState('');

  const { productCount = 0 } = useSelector((state) => state.product);

  return (
    <div className="container-fluid custom-navbar">

      {/* Top Banner */}
      <div className="first-navbar d-flex align-items-center justify-content-around">
        <span className="text-light">
          Sign up and get 20% off to your first order.{" "}
          <Link to="/signup" className="text-light">Sign Up Now</Link>
        </span>
        <IoClose className='d-none d-md-block' size={20} color="white" />
      </div>

      {/* Main Navbar */}
      <nav className="second-navbar navbar navbar-expand-lg bg-body-light navbar-light">
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LEFT SIDE */}
          <div className="d-flex align-items-center gap-3">

            {/* Hamburger */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Logo */}
            <Link to="/" className="navbar-brand logo">
              SHOP.CO
            </Link>
          </div>

          {/* COLLAPSIBLE MENU */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* CENTER MENU */}
            <ul className="items navbar-nav mx-auto mb-2 mb-lg-0">

              {/* Dropdown (keep <a> because bootstrap dropdown needs it) */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link d-flex align-items-center gap-1"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Shop <IoChevronDown size={14} />
                </a>

                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/men">Men</Link></li>
                  <li><Link className="dropdown-item" to="/women">Women</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/kids">Kids</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/new-arrival" className="nav-link">
                  New Arrivals
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/my-orders" className="nav-link">
                My Orders
                </Link>
              </li>

            </ul>

            {/* SEARCH */}
            <form className="search position-relative" role="search">
              <FaSearch className="search-icon" size={20} />
              <input
                type="search"
                placeholder="Search for Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

          </div>

          {/* RIGHT ICONS */}
          <ul className="d-flex gap-3 align-items-center">
            <li className="nav-item">
              <Link to="/cart">
                <FaShoppingCart size={22} />
                <sup style={{ fontSize: '16px', fontWeight: "bold", marginLeft: "5px" }}>
                  {productCount}
                </sup>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/login">
                <FaUser size={22} />
              </Link>
            </li>
          </ul>

        </div>
      </nav>

    </div>
  );
};

export default Navbar;