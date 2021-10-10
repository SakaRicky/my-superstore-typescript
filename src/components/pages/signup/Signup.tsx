import React, {useState} from 'react';
import Notification from '../../notifications/Notification';
import { Link } from 'react-router-dom';
import userService from '../../../services/user';
import { setUser, useStateValue } from '../../../state';

import './signup.css';
import { useHistory } from 'react-router';

const Signup = () => {
    const [state, dispatch ] = useStateValue();
    const [notification, setNotification] = useState<{message: string, class: string}>();
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const history = useHistory();

    const notify = (notification: {message: string, class: string}) => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(undefined);
        }, 5000);
    };

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await userService.signup({name, username, email, password});
            if (rememberMe) {
                window.localStorage.setItem('loggedUser', JSON.stringify(user));   
            }
            console.log(user);
            
            // dispatch({type: userTypes.SETUSER, data: user});
            dispatch(setUser(user));
            setEmail('');
            setPassword('');
            setPassword('');
            history.push('/');
            
        } catch (error: any) {
            console.log(error);
            notify({
                message: error.message,
                class: "alert alert-danger"
            });
        }
    };

    return (
        <div>
            {notification ? <div className="row">
                                                <div className={`col-sm-6 offset-sm-3 ${notification.class}`} role="alert">
                                                    <Notification message={notification.message} />
                                                </div>
                                            </div> : null}
        <div className="d-flex justify-content-center">
            <form className="signup" onSubmit={handleSignup}>
                <div className="d-flex justify-content-center"><h3>Create Account</h3></div>
                <div className="form-row d-flex my-2">
                    <div className="form-group col-md-6 mx-2">
                        <label htmlFor="inputEmail4">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6 mx-2">
                        <label htmlFor="inputPassword4">Username</label>
                        <input type="password" className="form-control" id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>

                <div className="form-row d-flex my-2">
                    <div className="form-group col-md-6 mx-2">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6 mx-2">
                        <label htmlFor="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
 
                <div className="d-flex justify-content-center m-2"><button type="submit" className="btn btn-primary">Create Account</button></div>
            </form>
        </div>
        </div>
    );
};

export default Signup;