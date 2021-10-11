import axios from 'axios';
import { User, SignupUser } from '../../types';

const baseUrl = '/';

export interface LoginProp {
    email: string,
    password: string
    username?: string
}

const login = async (credentials: any) => {
    const response = await axios.post<User>(`${baseUrl}login`, credentials);
    console.log(response);
    
    return response.data;
};

const signup = async (newUser: any) => {
    const response = await axios.post(`${baseUrl}signup`, newUser);
    return response.data;
};

const userServices = {login, signup};

export default userServices;