import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from "../api/api";


const register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

  const handlSubmit = async (e) => {
    e.preventDefault();
    let response = await createUser(user);
    
    if ( user ) {
        alert('user created!@!');
        navigate('/login')
      return response;
    } else {
      alert('please fill the inputs')
    }

  }

    return (
    <div className="container flex flex-col md:flex-row justify-center items-center my-5">
        <form onSubmit={handlSubmit} className="flex flex-col gap-3 w-full md:w-1/2">
        <h2 className="text-4xl font-bold text-center" > Sign Up </h2>
        
        <input 
            onChange={ (e) => setUser({...user, username: e.target.value}) } 
            type="text" 
            className="border border-grayBorder rounded-lg px-4 py-2 outline-none focus:scale-103 " 
            placeholder="Name" 
        />
        <input 
            onChange={ (e) => setUser({...user, email: e.target.value}) } 
            type="email" 
            className="border border-grayBorder rounded-lg px-4 py-2 outline-none focus:scale-103 " 
            placeholder="Email" 
        />
        <input 
            onChange={ (e) => setUser({...user, password: e.target.value}) } 
            type="password" 
            className="border border-grayBorder rounded-lg px-4 py-2 outline-none focus:scale-103 " 
            placeholder="Password" 
        />

        <div className="flex flex-row justify-between">
          <span className="cursor-pointer">Forgot Your Password?</span>
            <Link to={'/login'} >
                <span className="font-bold cursor-pointer" >Login</span>
            </Link>
        </div>
        <button className="px-4 py-2 bg-main rounded-lg text-white font-bold cursor-pointer" >Sign Up</button>
        </form>
    </div>
  )
}

export default register
