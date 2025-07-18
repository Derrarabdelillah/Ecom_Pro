import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Contact from "./pages/Contact"
import Collections from "./pages/Collections"
import Login from "./pages/Login"
import Header from "./components/Header"
import Product from "./pages/Product"
import CheckOut from "./pages/CheckOut"
import Regist from "./pages/register"

import { ToastContainer } from 'react-toastify';
import Profile from "./pages/Profile"
const App = () => {

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/register" element={<Regist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
