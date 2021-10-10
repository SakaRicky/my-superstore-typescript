import React, {useState} from 'react';
import Notification from '../../notifications/Notification';
import { Link } from 'react-router-dom';
import userService from '../../../services/user';
import cartServices from '../../../services/cart';
import { setCart, setUser, useStateValue } from '../../../state';

import './login.css';
import { useHistory } from 'react-router';

const Login = () => {
    const [state, dispatch ] = useStateValue();
    const [notification, setNotification] = useState<{message: string, class: string}>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);


    const history = useHistory();

    const notify = (notification: {message: string, class: string}) => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(undefined);
        }, 5000);
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await userService.login({email, password});
            cartServices.setToken(user.token);
            const cart = await cartServices.getCart(user.token);
            user.cart = cart;
            if (rememberMe) {
                window.localStorage.setItem('loggedUser', JSON.stringify(user));   
            }
            // dispatch({type: userTypes.SETUSER, data: user});
            dispatch(setUser(user));
            dispatch(setCart(cart));
            setEmail('');
            setPassword('');
            history.push('/');
            
        } catch (error) {
            console.log(error);
            notify({
                message: "Invalid username or password",
                class: "alert alert-danger"
            });
        }
    };

    return (
        <div className="container signin">
        {notification ? <div className="row">
                                                <div className={`col-sm-6 offset-sm-3 ${notification.class}`} role="alert">
                                                    <Notification message={notification.message} />
                                                </div>
                                            </div> : null}
            <form className="form-signin" onSubmit={handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only mb-2">Email address</label>
                    <input 
                        type="email" 
                        id="inputEmail" 
                        className="form-control mb-3" 
                        placeholder="Email address" 
                        required autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        />
                <label htmlFor="inputPassword" className="sr-only mb-2">Password</label>
                    <input 
                        type="password" 
                        id="inputPassword" 
                        className="form-control mb-3" 
                        placeholder="Password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" onChange={() => {setRememberMe(true);}}/> Remember me
                    </label>
                </div>
                <div className="d-flex justify-content-center"><button id="login-button" className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button></div>
            </form>

            <div className="m-3"><small>Don&quot;t yet have an account ? <Link to='/signup'>Sign up</Link> here</small></div>
        </div>
    );
};

export default Login;