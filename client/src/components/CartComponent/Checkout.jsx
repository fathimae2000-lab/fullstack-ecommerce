import React, { useState } from "react"
import "./checkout.scss"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCart } from "../../productAPI/ProductSlice"
// ✅ fix: import placeOrder thunk
import { placeOrder } from "../../productAPI/ProductThunk"

function Checkout() {
  const { productCart } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [payment, setPayment] = useState("cod")

  const [address, setAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  })

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.id]: e.target.value })
  }

  const totalPrice = productCart.reduce((total, item) => {
    const price = item.offerprice ? item.offerprice : item.price
    return total + price * item.quantity
  }, 0)

  const shipping = totalPrice > 499 ? 0 : 49
  const grandTotal = totalPrice + shipping

  const paymentOptions = [
    {
      value: "cod",
      label: "Cash on Delivery",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M22 10H2" />
        </svg>
      ),
    },
    {
      value: "upi",
      label: "UPI",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      value: "card",
      label: "Credit / Debit Card",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
  ]

 const handlePlaceOrder = async () => {


  // ✅ fix: safely parse user from localStorage
  const stored = localStorage.getItem('user')
  const user = stored && stored !== 'undefined' ? JSON.parse(stored) : null

  if (!user || !user.id) {
    alert("Please login again")
    navigate('/login')
    return
  }

  if (productCart.length === 0) {
    alert("Cart is empty")
    return
  }

  const { fullname, address: addr, city, pincode, phone } = address
  if (!fullname || !addr || !city || !pincode || !phone) {
    alert("Please fill all shipping details")
    return
  }

  const result = await dispatch(placeOrder({
    user_id: user.id,
    items: productCart,
    total_amount: grandTotal,
    payment_method: payment,
    address: `${fullname}, ${addr}, ${city}, ${pincode}, ${phone}`
  }))

  if (placeOrder.fulfilled.match(result)) {
    dispatch(clearCart())
    navigate('/order-success')
  } else {
    alert(result.payload || 'Order failed')
  }
  console.log(localStorage.getItem('user'))
console.log(localStorage.getItem('token'))
} 
  return (
    <div className="co-page">
      <div className="container-fluid px-3 px-md-4 px-lg-5">

        {/* Header */}
        <div className="co-header row align-items-center mb-4">
          <div className="col">
            <div className="co-logo">
              <span className="co-logo__mark" />
              <span className="co-logo__name">Checkout</span>
            </div>
          </div>
          <div className="col-auto">
            <span className="co-badge">{productCart.length} item{productCart.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="row g-4 g-xl-5">

          {/* LEFT: Shipping + Payment */}
          <div className="col-12 col-lg-7">

            {/* Shipping card */}
            <div className="co-card mb-4">
              <div className="co-card__head">
                <span className="co-step">01</span>
                <h2>Shipping Details</h2>
              </div>
              <div className="co-card__body">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="co-field">
                      <label htmlFor="fullname">Full Name</label>
                      {/* ✅ fix 7 - all inputs connected to state */}
                      <input
                        id="fullname"
                        type="text"
                        placeholder="John Doe"
                        value={address.fullname}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="co-field">
                      <label htmlFor="address">Address</label>
                      <input
                        id="address"
                        type="text"
                        placeholder="123 Street, Area"
                        value={address.address}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="co-field">
                      <label htmlFor="city">City</label>
                      <input
                        id="city"
                        type="text"
                        placeholder="Mumbai"
                        value={address.city}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="co-field">
                      <label htmlFor="pincode">Pincode</label>
                      <input
                        id="pincode"
                        type="text"
                        placeholder="400 001"
                        value={address.pincode}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="co-field">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={address.phone}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment card */}
            <div className="co-card">
              <div className="co-card__head">
                <span className="co-step">02</span>
                <h2>Payment Method</h2>
              </div>
              <div className="co-card__body">
                <div className="co-payment-grid">
                  {paymentOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`co-pay-option ${payment === opt.value ? "co-pay-option--active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={payment === opt.value}
                        onChange={() => setPayment(opt.value)}
                      />
                      <span className="co-pay-icon">{opt.icon}</span>
                      <span className="co-pay-label">{opt.label}</span>
                      <span className="co-pay-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary */}
          <div className="col-12 col-lg-5">
            <div className="co-summary">
              <div className="co-card__head">
                <span className="co-step">03</span>
                <h2>Order Summary</h2>
              </div>

              <div className="co-items">
                {productCart.length === 0 ? (
                  <p className="co-empty">Your cart is empty.</p>
                ) : (
                  productCart.map((item) => {
                    const price = item.offerprice ? item.offerprice : item.price;
                    return (
                      <div className="co-item" key={item.id}>
                        <div className="co-item__img">
                          {item.imageUrl
                            ? <img src={item.imageUrl} alt={item.product_name} />
                            : <span>{item.product_name?.[0]}</span>
                          }
                        </div>
                        <div className="co-item__info">
                          <p className="co-item__name">{item.product_name}</p>
                          <p className="co-item__qty">Qty: {item.quantity}</p>
                        </div>
                        <div className="co-item__price">
                          ₹{(price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="co-totals">
                <div className="co-totals__row">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="co-totals__row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "co-free" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="co-shipping-note">
                    Add ₹{(499 - totalPrice).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="co-totals__grand">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={handlePlaceOrder} className="co-place-order">
                Place Order
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              <p className="co-secure">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Secured with 256-bit SSL encryption
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;