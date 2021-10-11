import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartArrowDown } from 'react-icons/fa';

import './navItem.css';
import { useStateValue } from '../../../state';

type NavItemProp = {
    navName: string
    linkTo: string
    sign_in?: boolean
};

const NavItem = ({navName, linkTo, sign_in}: NavItemProp) => {
    const [state] = useStateValue();
    const cartItems = state.cart;

    let className = "nav-item";
    if (sign_in) {
        className = className + " sign_in";
    }
    if (navName === 'Cart') {

        const pillNotification = cartItems && cartItems.length !== 0 ? <div className="icon-tag">{cartItems.length}</div> : null;
        
        return <li className={`${className} `}>
                <NavLink
                    id="cart"
                    to={linkTo}
                    exact 
                    className="icon-block" 
                    activeClassName="active">
                    {navName}  <FaCartArrowDown size={25} />
                    {pillNotification}
                </NavLink>
            </li>;
    }
    if (navName === 'Admin') {
        
        return <li className={`${className} admin`}>
                <NavLink 
                    to={linkTo}
                    exact 
                    className="">
                    {navName}
                </NavLink>
            </li>;
    }
    return <li className={`${className} `}>
                <NavLink 
                    to={linkTo}
                    exact 
                    className="" 
                    activeClassName="active">
                    {navName}
                </NavLink>
            </li>;
};

export default NavItem;