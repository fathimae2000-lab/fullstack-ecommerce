import React from 'react';
import './MainReviewBox.scss';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import tick from '../assets/images/tick.svg';

function MainReviewBox({ item }) {
  const rating = Number(item?.rating || 0);

  const formattedDate = item?.created_at
    ? new Date(item.created_at).toLocaleDateString()
    : "";

  return (
    <div className="review-box">
      
      {/* Stars */}
      <div className="d-flex mb-3">
        {[...Array(5)].map((_, index) => {
          if (index + 1 <= rating) {
            return <FaStar key={index} size={22} color="#ffc107" />;
          } else if (index < rating) {
            return <FaStarHalfAlt key={index} size={22} color="#ffc107" />;
          } else {
            return <FaRegStar key={index} size={22} color="#ffc107" />;
          }
        })}
      </div>

      {/* Name */}
      <div className="d-flex align-items-center gap-2">
        <span className="review-name fw-semibold">
          {item?.user_name}
        </span>
        <img src={tick} alt="verified" width={20} />
      </div>

      {/* Comment */}
      <p className="text-muted mt-2">
        {item?.comment}
      </p>

      {/* Date */}
      <p className="text-muted">
        Posted on {formattedDate}
      </p>

    </div>
  );
}

export default MainReviewBox;