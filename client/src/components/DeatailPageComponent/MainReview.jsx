import React, { useEffect } from 'react';
import './MainReview.scss';
import MainReviewBox from '../../ui/MainReviewBox';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchReviewsById } from '../../productAPI/ProductThunk';

function MainReview() {
  const { reviews = [], reviewsLoading } = useSelector(
    (state) => state.product
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsById(id));
    }
  }, [dispatch, id]);

  if (reviewsLoading) return <p>Loading...</p>;

  return (
    <div className="container main-review mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <ul className="nav nav-underline review-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#">Product Details</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Rating & Reviews</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">FAQs</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="review-content mt-4">
        <h2>{reviews.length} Reviews</h2>

        <div className="row g-3 mt-2">
          {reviews.map((item) => (
            <div className="col-12 col-sm-6" key={item.id}>
              <MainReviewBox item={item} />
            </div>
          ))}
        </div>
      </div>

      <Button text={'Load More Reviews'} />
    </div>
  );
}

export default MainReview;