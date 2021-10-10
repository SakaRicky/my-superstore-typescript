import axios from 'axios';

const baseUrl = '/';

export interface LoginProp {
    username: string,
    password: string
}

export interface SignUpProp {
    email: string,
    username: string,
    password: string,
}

const login = async (credentials: LoginProp) => {
    const response = await axios.post(`${baseUrl}login`, credentials);
    return response.data;
};

const signup = async (newUser: SignUpProp) => {
    const response = await axios.post(`${baseUrl}login`, newUser);
    return response.data;
};

const userServices = {login, signup};

export default userServices;