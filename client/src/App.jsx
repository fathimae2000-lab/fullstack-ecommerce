import Navbar from "./components/Navbar/Navbar"; 
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import ProductDeatailPage from "./pages/ProductDeatailPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchproducts } from "./productAPI/ProductThunk";
import NewArrival from "./components/HomeComponent/NewArrival";
import Loader from "./ui/Loader";
import Login from "./components/loginComponent/Login";
import Checkout from "./components/CartComponent/Checkout";
import Signup from "./components/loginComponent/Signup";
import MyOrders from "./pages/MyOrders";
import OrderSuccess from "./components/CartComponent/OrderSuccess";
import OrderHistory from "./components/CartComponent/OrderHistory";
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchproducts())
  }, [dispatch])

  const { loading, error } = useSelector((state) => state.product)

  if (loading) return <Loader />
  if (error) return <h1>{error}</h1>

  return (
    <div className="container-fluid">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDeatailPage />} />
          <Route path="/new-arrival" element={<NewArrival />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order-success" element={<OrderSuccess />} />  {/* ✅ add this */}
          <Route path="/orders" element={<OrderHistory />} />          {/* ✅ add this */}
        </Routes> 
      <Footer />
    </div>
  )
}

export default App;