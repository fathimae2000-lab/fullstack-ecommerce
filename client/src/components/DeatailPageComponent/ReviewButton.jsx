import React, { useEffect, useState } from 'react'
import './ReviewButton.scss'
import ReviewForm from './ReviewForm'
import { useNavigate } from 'react-router-dom'

// ✅ fix: destructure autoOpen prop
function ReviewButton({ product_id, autoOpen }) {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const storedUser = localStorage.getItem('user')
  let user = null
  if (storedUser) {
    try {
      user = JSON.parse(storedUser)
    } catch (err) {
      user = null
    }
  }

  // ✅ fix: auto open form after redirect from login
  useEffect(() => {
    if (autoOpen) {
      setShowForm(true)
    }
  }, [autoOpen])

  const handleReview = () => {
    if (!user) {
      // ✅ fix: save flag before redirecting
      localStorage.setItem('openReviewAfterLogin', 'true')
      navigate('/login', { state: { from: `/product/${product_id}` } })
      return
    }
    setShowForm(!showForm)
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      
      <button onClick={handleReview}
        type="button"
        className={`btn btn-outline-dark rounded-pill ${
          showForm ? "" :"review-btn"
        }`}      
        >
        {showForm ?   "" : "Write a Review"}
      </button >
      {showForm && <ReviewForm  setShowForm={setShowForm}/>}
    </div>
  )
}

export default ReviewButton