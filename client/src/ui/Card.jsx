import React, { useState } from 'react';
import './Card.scss';
import { FaStar, FaRegStar, FaStarHalfAlt, FaRupeeSign } from 'react-icons/fa';
import { Link } from "react-router-dom";

function Card({ product }) {



  if (!product) return null;

  const rating = Number(product.rating) || 0;

  return (
    <div className="product-card mb-5">
      <img
        src={product.imageUrl}
        className="product-img"
        alt={product.product_name}
      />

      <div className="text-center">
        <h5 className="mb-2">{product.product_name}</h5>

        <div className="rating d-flex justify-content-center gap-1 text-warning mb-3">
          {[...Array(5)].map((_, index) => {
            if (index < Math.floor(rating)) return <FaStar key={index} />;
            if (index < rating) return <FaStarHalfAlt key={index} />;
            return <FaRegStar key={index} />;
          })}
        </div>

        <p className="product-price fw-bold mb-2">
          <FaRupeeSign />
          {product.offerprice ? (
            <>
              {product.offerprice}{" "}
              <span style={{ textDecoration: "line-through", color: "gray" }}>
                {product.price}
              </span>
            </>
          ) : (
            product.price
          )}
        </p>
        <Link   to={`/product/${product.id}`}>
          <button className="btn-custom btn btn-dark w-50 mt-3">
            Details
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Card;