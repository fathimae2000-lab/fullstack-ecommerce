import { createSlice } from "@reduxjs/toolkit";
import {
  fetchproducts,
  fetchProductById,
  fetchReviewsById,
  addReview,
  fetchReviews,
  placeOrder,         // ✅ new
  fetchOrdersByUser,  // ✅ new
  fetchOrderById,     // ✅ new
} from "../productAPI/ProductThunk";

const BASE_URL = "http://localhost:5000/products/";

const initialState = {
  productList: [],
  productCart: [],
  productCount: 0,
  totalPrice: 0,

  loading: false,
  detailLoading: false,
  reviewLoading: false,
  allReviewLoading: false,

  // ✅ new order states
  orderLoading: false,
  orderSuccess: false,
  orders: [],
  currentOrder: null,
  orderError: null,

  error: null,

  details: null,
  reviews: [],
  allReviews: [],

  filteredProducts: [],
  selectedCategory: ""
};

// ✅ CALCULATE TOTAL
const calculateTotalPrice = (state) => {
  state.totalPrice = state.productCart.reduce((total, item) => {
    const price = Number(item.offerprice || item.price)
    return total + price * item.quantity
  }, 0)
}

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {

    // 🟢 ADD TO CART
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.productCart.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.productCart.push({ ...item, quantity: 1 });
      }
      state.productCount += 1;
      calculateTotalPrice(state);
    },

    // 🟢 INCREMENT
    increment: (state, action) => {
      const item = state.productCart.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.productCount += 1;
        calculateTotalPrice(state);
      }
    },

    // 🟢 DECREMENT
    decrement: (state, action) => {
      const item = state.productCart.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.productCount -= 1;
        } else {
          state.productCart = state.productCart.filter(i => i.id !== action.payload);
          state.productCount -= 1;
        }
        calculateTotalPrice(state);
      }
    },

    // 🟢 REMOVE ITEM
    removeFromCart: (state, action) => {
      state.productCart = state.productCart.filter(
        item => item.id !== action.payload
      );
      calculateTotalPrice(state);
    },

    // 🟢 CLEAR CART
    clearCart: (state) => {
      state.productCart = [];
      state.productCount = 0;
      state.totalPrice = 0;
    },

    // 🟢 CLEAR DETAILS
    cleardetails: (state) => {
      state.details = null;
      state.reviews = [];
      state.error = null;
    },

    // ✅ new - reset order state when needed
    clearOrderState: (state) => {
      state.orderSuccess = false;
      state.orderError = null;
      state.currentOrder = null;
    },

    // 🟢 FILTER CATEGORY
    setCategoryFilter: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === "All") {
        state.filteredProducts = state.productList;
      } else {
        state.filteredProducts = state.productList.filter(
          item => item.category === action.payload
        );
      }
    }
  },

  extraReducers: (builder) => {
    builder

      // 🔹 FETCH PRODUCTS
      .addCase(fetchproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.data.map(item => ({
          ...item,
          imageUrl: item.image ? `${BASE_URL}${item.image}` : ""
        }));
      })
      .addCase(fetchproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔹 FETCH PRODUCT DETAILS
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        const item = action.payload?.data;
        if (!item) return;
        state.details = {
          ...item,
          imageUrl: item.image ? `${BASE_URL}${item.image}` : ""
        };
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.error.message;
      })

      // 🔹 FETCH REVIEWS BY PRODUCT ID
      .addCase(fetchReviewsById.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(fetchReviewsById.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviews = action.payload.data || [];
      })
      .addCase(fetchReviewsById.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.error.message;
      })

      // 🔹 ADD REVIEW
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload.data);
      })

      // 🔹 FETCH ALL REVIEWS
      .addCase(fetchReviews.pending, (state) => {
        state.allReviewLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.allReviewLoading = false;
        state.allReviews = action.payload.data.slice(0, 3);
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.allReviewLoading = false;
        state.error = action.error.message;
      })

      // ✅ PLACE ORDER
      .addCase(placeOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderSuccess = false;
        state.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderSuccess = true;
        state.currentOrder = action.payload.data;  // save placed order
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderSuccess = false;
        state.orderError = action.payload || 'Order failed';
      })

      // ✅ FETCH ALL ORDERS BY USER
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orders = action.payload.data || [];
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload || 'Failed to fetch orders';
      })

      // ✅ FETCH SINGLE ORDER
      .addCase(fetchOrderById.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload || 'Failed to fetch order';
      });
  },
});

// ✅ EXPORTS
export const {
  addToCart,
  increment,
  decrement,
  removeFromCart,
  clearCart,
  cleardetails,
  clearOrderState,  // ✅ new
  setCategoryFilter
} = productSlice.actions;

export default productSlice.reducer;