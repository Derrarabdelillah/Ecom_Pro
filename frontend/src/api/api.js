import Axios from 'axios';

let PORT = 3000;
let URL = `http://localhost:${PORT}/api`;

export async function createUser(user) {
    const response = await Axios.post(`${URL}/users`, user);
    return response.data;
}

export async function verifyUser(user) {
    const response = await Axios.post(`${URL}/users/login`, user);
    return response.data;
}