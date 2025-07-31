import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Dashbord from './pages/Dashbord'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Add from './pages/Add';
import { useEffect, useState } from 'react'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify'
import Users from './pages/Users'
import Settings from './pages/Settings'
import jwtDecode from "jwt-decode";

const App = () => {
  
  const [token, setToken] = useState( localStorage.getItem('token') ? localStorage.getItem('token') : '');
  
  const checkTokenExp = (token) => {
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true
    }
  }

  useEffect( () => {
    localStorage.setItem('token', token)

    if ( checkTokenExp(token) ) {
      localStorage.removeItem('token');
      window.location.reload();
    }
  },[token] )

  return (
    <div>
      { token === '' || null
      ? <Login setToken={setToken} />
      : 
        <>
          <Navbar setToken={setToken} />
          <div className="flex flex-row">
            <div className="w-[18%] ">
              <SideBar />
            </div>

            <div className="container">
              <Routes>
                <Route path='/' element={<Dashbord />} />
                <Route path='/products' element={<Products token={token}  />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/users' element={<Users token={token} />} />
                <Route path='/settings' element={<Settings token={token} />} />
              </Routes>
            </div>

          </div>
        </>
      }
    </div>
  )
}

export default App