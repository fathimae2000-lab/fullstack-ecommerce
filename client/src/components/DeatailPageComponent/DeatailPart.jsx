import React, { use, useEffect, useState } from 'react';
import { FaStar,FaRegStar,FaStarHalfAlt } from 'react-icons/fa';
import './DeatailPart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../productAPI/ProductThunk';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../ui/Loader';
import { addToCart } from '../../productAPI/ProductSlice';
import ReviewButton from './ReviewButton';
function DeatailPart() {

    const navigate=useNavigate()
    const location=useLocation()

   
  const {id}=useParams()
  const {details,detailLoading,error}=useSelector((state)=>state.product)
  const dispatch=useDispatch()

    const[autoOpenReview,setAutoOpenReview]=useState(false)
  useEffect(()=>{
   dispatch(fetchProductById(id)) 
  },[id,dispatch])

  useEffect(()=>{
    const shouldOpen=localStorage.getItem('openReviewAfterLogin')

    if(shouldOpen ==='true'){
      setAutoOpenReview(true)
      localStorage.removeItem('openReviewAfterLogin')
    }
  },[])
  if(detailLoading) return <Loader />
  if(error) return <p>{error}</p>
  if (!details) return null; 

  const rating=Number(details?.rating || 0)



   const handleAddToCart=()=>{
        dispatch(addToCart(details))      
        navigate('/cart')
    }


  return (
    <>
    <div className='container detail-main'>

      {/* Breadcrumb */}
      <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item">Shop</li>
          <li className="breadcrumb-item">Men</li>
          <li className="breadcrumb-item active">T-shirts</li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className='row g-4'>

        {/* LEFT - IMAGES */}
        <div className="col-12 col-md-6">
          <div className='img-section d-flex flex-column flex-md-row gap-3'>

            {/* Thumbnails */}
            <div className='d-flex flex-row flex-md-column gap-3'>
              <div className='box'>
                <img src={details.imageUrl} alt={details.name} />
              </div>
              <div className='box'>
                <img src={details.imageUrl} alt={details.name}/>
              </div>
              <div className='box'>
                <img src={details.imageUrl} alt={details.name} />
              </div>
            </div>

            {/* Big Image */}
            <div className='big-img'>
              <img src={details.imageUrl} alt="img" />
            </div>

          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="col-12 col-md-6 right">

          <h2>{details.product_name}</h2>

          {/* rating */}
                 <div className="rating d-flex  gap-1 text-warning mt-2 mb-4" >
                          {[...Array(5)].map((_, index) => {
                            if (index < Math.floor(rating)) return <FaStar key={index} />;
                            if (index < rating) return <FaStarHalfAlt key={index} />;
                            return <FaRegStar key={index} />;
                          })}
                        </div>
                        {details.offerprice ? (
                          <>
                          {details.offerprice} {""}
                          <span className='price' style={{textDecoration:'line-through' ,color:"grey"}}>{details.price}</span>
                          </> 
                        ) : (
                          details.price
                        )}
          <p>
           {details.description}
          </p>

          {/* Colors */}
          <div className="color-section mt-3">
            <span className="title">Select Colors</span>

            <div className="d-flex gap-3 mt-2">
              <input type="radio" name="color" id="green" hidden />
              <label htmlFor="green" className="color-box green"></label>

              <input type="radio" name="color" id="red" hidden />
              <label htmlFor="red" className="color-box red"></label>

              <input type="radio" name="color" id="blue" hidden />
              <label htmlFor="blue" className="color-box blue"></label>
            </div>
          </div>

          <hr />

          {/* Sizes */}
          <div className="size-section mt-3">
            <span className="title">Select Size</span>

            <div className="d-flex flex-wrap  mt-2">
              <input type="radio" name="size" id="xs" hidden />
              <label htmlFor="xs" className="size-box ">Small</label>

              <input type="radio" name="size" id="s" hidden />
              <label htmlFor="s" className="size-box ms-1" >Medium</label>

              <input type="radio" name="size" id="m" hidden />
              <label htmlFor="m" className="size-box ms-1">Large</label>

              <input type="radio" name="size" id="l" hidden />
              <label htmlFor="l" className="size-box ms-1">X-Large</label>
            </div>
          </div>

          {/* Quantity + Button */}
          <div className="row align-items-center g-3 mt-3">

            <div className="col-12 col-sm-5">
              <div className="quantity-box d-flex align-items-center justify-content-between">
                <button className="qty-btn">-</button>
                <span className="qty-value">1</span>
                <button className="qty-btn">+</button>
              </div>
            </div>

            <div className="col-12 col-sm-7">
                   <button  onClick={handleAddToCart} className='cart w-100'>Add to Cart</button>
            </div>

          </div>

        </div>
      </div>
    </div>

        <ReviewButton product_id={details.id}
                        autoOpen={autoOpenReview}/>

      </>
  );
}

export default DeatailPart;