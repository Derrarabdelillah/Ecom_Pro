import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Header from "./components/Header"
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./components/Order";
import MyOrderS from "./pages/MyOrders";
import Verify from "./pages/Verify";
import Shop from "./pages/Shop";

const  App = () => {

  return (
      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/product" element={<Product />}>
            <Route path=":productID" element={<Product />} />
          </Route>

          <Route path="/shop" element={<Shop />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/myorders" element={<MyOrderS />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>

      </BrowserRouter>
  )
}

export default App
