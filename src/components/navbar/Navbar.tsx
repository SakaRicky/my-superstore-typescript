import React, {useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import NavItem from './navItem/NavItem';
import './navbar.css';
import { useStateValue, initiateState } from "../../state";


const MyNavbar = () => {
    const [state, dispatch] = useStateValue();
    const [navbarActive, setNavbarActive] = useState<boolean>(false);

    const userState = state.user;
    
    const history = useHistory();

    const handleLogout = () => {
        dispatch(initiateState());
        window.localStorage.removeItem('loggedUser');
        history.push('/login');
    };

    const navItemsClassName = navbarActive ? "nav_items active" : "nav_items";

    const toggleSideDrawer = () => {
        setNavbarActive(!navbarActive);
    };

    const signInButton = userState === null
        ? <NavItem sign_in navName="Sign In" linkTo='/login' />
        : <div className="px-4 m-0 text-white">
            <div>{userState.name}</div>
            <div className="logout" onClick={handleLogout}>logout</div>
          </div>;
    
    const burgerIcon = navbarActive ? 
                                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    :

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>;
    return (
            <nav className="navBar">
                <div className="logo">
                    <Link to='/'>Super Store</Link>
                </div>

                <ul className={navItemsClassName}>
                    <NavItem navName="Home" linkTo='/' />
                    <NavItem navName="Deals" linkTo='/deals' />
                    <NavItem navName="Cart" linkTo='/cart' />
                    {userState && userState.role === 'admin' ? <NavItem navName="Admin" linkTo='/admin' /> : null}
                    {signInButton}
                </ul>

                <div className="burger" onClick={toggleSideDrawer}>
                    {burgerIcon}
                </div>
                
            </nav>
        );
};

export default MyNavbar;