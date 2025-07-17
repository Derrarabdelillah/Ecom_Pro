import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
// import { backendUrl } from '../api';
const backendUrl = "http://localhost:3000";


const Login = ({setToken}) => {

    const [user, setUser] = useState({})
    const navigate = useNavigate();

    const handlSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/users/admin', user);
            const token = response.data.token;

            if ( response.data.success ) {
                setToken(token);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>
        <ToastContainer />
      <div>
    <div className="flex flex-col md:flex-row h-[600px] justify-center items-center ">
        <form onSubmit={handlSubmit} className="flex flex-col gap-3 md:w-1/2 shadow-md px-10 py-15 border border-grayBorder rounded-lg">
        <h2 className="text-4xl font-semibold bg-gradient-to-r from-main to-indigo-600 
            bg-clip-text text-transparent tracking-tight text-center" > Admin Panel </h2>
        
        <div className="flex flex-col gap-1">
            <label className='font-medium text-lg' >Email</label>
            <input 
                onChange={ (e) => setUser({...user, email: e.target.value}) } 
                type="email" 
                className="border border-grayBorder rounded-lg px-4 py-2 outline-none focus:scale-103 " 
                placeholder="your@email.com" 
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className='font-medium text-lg' >Password</label>
            <input 
                onChange={ (e) => setUser({...user, password: e.target.value}) } 
                type="password" 
                className="border border-grayBorder rounded-lg px-4 py-2 outline-none focus:scale-103 " 
                placeholder="Password" 
            />
        </div>
        
        <button className="px-4 py-2  bg-gradient-to-r from-main to-indigo-600 rounded-lg text-white font-bold cursor-pointer" >Login</button>
        </form>
    </div>
      </div>
    </div>
  )
}

export default Login
