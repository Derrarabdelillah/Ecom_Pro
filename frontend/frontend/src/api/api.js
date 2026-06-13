import axios from 'axios';
import { productsContext } from '../context/ProductsContext';


const { backendUrl } = productsContext;

export async function createUser(user) {
    const response = await axios.post(`${backendUrl}/api/users`, user);
    return response.data;
}

export async function verifyUser(user) {
    const response = await axios.post(`${backendUrl}/api/users/login`, user);
    return response.data;
}