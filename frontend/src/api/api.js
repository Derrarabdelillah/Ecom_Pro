import Axios from 'axios';
import { productsContext } from '../context/ProductsContext';


const { backendUrl } = productsContext;

export async function createUser(user) {
    const response = await Axios.post(`${backendUrl}/users`, user);
    return response.data;
}

export async function verifyUser(user) {
    const response = await Axios.post(`${backendUrl}/users/login`, user);
    return response.data;
}