import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api";

// 🔹 Get all products
export const fetchproducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
  }
);

// 🔹 Get product by ID
export const fetchProductById = createAsyncThunk(
  "productDetails/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
  }
);

export const fetchReviews = createAsyncThunk(
  'reviews/fetch',
  async () => {
    const response = await fetch(`${BASE_URL}/reviews?limit=3`)
    const data = await response.json()
    return data
  }
)

// 🔹 Get reviews by product ID
export const fetchReviewsById = createAsyncThunk(
  "reviews/fetchById",
  async (id) => {
    const response = await fetch(`${BASE_URL}/reviews/${id}`);
    const data = await response.json();
    return data;
  }
);

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (reviewData) => {
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(reviewData)
    })
    const data = await response.json()
    return data
  }
)

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message)
      }
      return data
    } catch (err) {
      return rejectWithValue('Server error')
    }
  }
)

export const fetchOrdersByUser = createAsyncThunk(
  'orders/fetchByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/orders/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message)
      }
      return data
    } catch (err) {
      return rejectWithValue('Server error')
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message)
      }
      return data
    } catch (err) {
      return rejectWithValue('Server error')
    }
  }
)