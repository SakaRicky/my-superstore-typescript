import axios from 'axios';
import { CartItemType } from '../../types';

const baseUrl = 'http://localhost:5000/';

let token: string | null = null;

const setToken = (t: string) => {
    token = t;
};

const getCart = async () => {
    const config = {
        headers: { authorization: `bearer ${token}`}
    };
    console.log('config', config);
    const response = await axios.get(`${baseUrl}cart`, config);
    return response.data;
};

const saveCart = async (cart: CartItemType[]) => {
    const config = {
        headers: { authorization: `bearer ${token}`}
    };
    console.log('config', config);
    const response = await axios.post(`${baseUrl}cart/`, cart, config);
    return response;
};

const cartServices = { setToken, saveCart, getCart };

export default cartServices;