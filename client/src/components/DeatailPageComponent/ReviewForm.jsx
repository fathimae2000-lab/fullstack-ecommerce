import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchReviewsById } from "../../productAPI/ProductThunk"
import { useParams } from "react-router-dom"

function ReviewForm({ setShowForm }) {

  const { id } = useParams()
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")

      const API_URL = import.meta.env.VITE_API_URL;


  const [form, setForm] = useState({
    rating: "",
    comment: "",
    user_name: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      alert("Please login first")
      return
    }

    if (!form.rating || !form.comment) {
      alert("Please fill all fields")
      return
    }

    const rating = Number(form.rating)

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5")
      return
    }

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: id,
          rating: rating,
          comment: form.comment,
           user_name: form.user_name 
        })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      // ✅ refresh reviews
      dispatch(fetchReviewsById(id))

      setShowForm(false)

    } catch (err) {
      console.log(err)
      alert("Server error")
    }
  }

  return (
    <div className="review-form">

      <h5>Write a Review</h5>

      <input
        type="text"
        name="user_name"
        placeholder="Username"
        value={form.user_name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        step={0.1}
        value={form.rating}
        onChange={handleChange}
      />

      <textarea
        name="comment"
        placeholder="Write review..."
        value={form.comment}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Submit Review
      </button>

    </div>
  )
}

export default ReviewForm