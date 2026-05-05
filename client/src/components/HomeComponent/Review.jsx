import React, { useEffect } from "react";
import "./Review.scss";
import { FaStar ,FaRegStar,FaStarHalfAlt} from "react-icons/fa";
import tick from '../../assets/images/tick.svg';
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../productAPI/ProductThunk";
function Review() {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchReviews())
  },[dispatch])


  const{allReviews}=useSelector((state => state.product))


  return (

    <div className="review container py-5">
      <h2 className="text-center ">OUR HAPPY CUSTOMER</h2>

         <div className="d-flex flex-wrap gap-1">
           {allReviews.map(item =>(
                      <div className="review-box card shadow-sm p-4">
           
         {/* Stars */}
              <div className="d-flex mb-3">
                {[...Array(5)].map((_, index) => {
                  if (index + 1 <= item.rating) {
                    return <FaStar key={index} size={22} color="#ffc107" />;
                  } else if (index < item.rating) {
                    return <FaStarHalfAlt key={index} size={22} color="#ffc107" />;
                  } else {
                    return <FaRegStar key={index} size={22} color="#ffc107" />;
                  }
                })}
              </div>
     
           {/* Name */}
           <div className="d-flex align-items-center gap-2">
             <span className="review-name fw-semibold">
             {item.user_name}
             </span>
             <img src={tick} alt="verified" width={19} />
           </div>
     
           {/* Review */}
           <p className="text-muted mt-2">
           {item.comment}
           </p>
     
         </div>
          ))}
         </div>
  
    </div>
  );
}

export default Review;
