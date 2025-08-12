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
import Users from './pages/Users'
import Settings from './pages/Settings'
import Update from './pages/Update'
import Cookies from 'universal-cookie'

const App = () => {
  const cookies = new Cookies();

  const [token, setToken] = useState(cookies.get('token') ? cookies.get('token') : '');
  const navigate = useNavigate();
  useEffect(() => {
    cookies.set('token', token);

    setTimeout(() => {
      cookies.remove('token');
      window.location.reload();
    }, 950000);
  }, [token])

  return (
    <div>
      {token === '' || !token
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
                <Route path='/' element={<Dashbord  token={token} />} />
                <Route path='/products' element={<Products token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/update/:id' element={<Update token={token} />} />
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