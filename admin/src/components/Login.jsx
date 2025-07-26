import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useContext } from 'react';
import { productsContext } from "../../../frontend/src/context/ProductsContext"


const Login = ({ setToken }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { backendUrl } = useContext(productsContext)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const response = await axios.post(backendUrl + '/api/users/admin', user);
            const token = response.data.token;

            if (response.data.success) {
                setToken(token);
                toast.success(response.data.message);

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
            <ToastContainer />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-main to-indigo-600 
            bg-clip-text text-transparent tracking-tight mb-2">Admin Panel</h2>
                        <p className="text-gray-600">Sign in to access the dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                                    placeholder="Admin Email"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-main to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all ${isLoading ? 'opacity-70' : ''}`}
                        >
                            {isLoading ? (
                                'Authenticating...'
                            ) : (
                                <>
                                    Login <FiArrowRight className="ml-2" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
