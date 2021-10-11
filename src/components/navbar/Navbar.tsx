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

    const showSideDrawer = () => {
        console.log("click toggle button");
        console.log(navbarActive);
        setNavbarActive(!navbarActive);
    };

    const signInButton = userState === null
        ? <NavItem sign_in navName="Sign In" linkTo='/login' />
        : <div className="px-4 m-0 text-white">
            <div>{userState.name}</div>
            <div className="logout" onClick={handleLogout}>logout</div>
          </div>;

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
                <div className="burger" onClick={showSideDrawer}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        // <nav className="navbar navbar-expand-md navbar-light py-2 head_bar">
        //         <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        //             <FaBars className="navbar-toggler-icon" style={{color:"white"}} />
        //         </button>
        //         <Link to='/' className="navbar-brand display-1 text-white font-weight-bolder">Super Store</Link>

        //     <div className="d-flex justify-content-end collapse navbar-collapse" id="navbarToggler">
        //         <ul className="navbar-nav ml-auto">
        //             <NavItem navName="Home" linkTo='/' />
        //             <NavItem navName="Deals" linkTo='/deals' />
        //             <NavItem navName="Cart" linkTo='/cart' />
        //             {userState && userState.role === 'admin' ? <NavItem navName="Admin" linkTo='/admin' /> : null}
        //             {signInButton}
        //         </ul>
        //     </div>
        // </nav>
        // <Navbar className="head_bar" expand="lg">
        //     <Navbar.Brand>
        //         <Link to='/' className="navbar-brand display-1 text-white font-weight-bolder">Super Store</Link>
        //     </Navbar.Brand>

        //     <Navbar.Toggle color="white" className="text-white"/>
        //     <Navbar.Collapse>
        //         <Nav>
        //             <Nav.Link><NavItem navName="Home" linkTo='/' /></Nav.Link>
        //             <Nav.Link><NavItem navName="Deals" linkTo='/deals' /></Nav.Link>
        //             <Nav.Link><NavItem navName="Cart" linkTo='/cart' /></Nav.Link>
        //             <Nav.Link><NavItem navName="Cart" linkTo='/cart' />{userState && userState.role === 'admin' ? <NavItem navName="Admin" linkTo='/admin' /> : null}</Nav.Link>
        //             <Nav.Link>{signInButton}</Nav.Link>
        //         </Nav>
        //     </Navbar.Collapse>

            
        // </Navbar>
        // <Navbar collapseOnSelect className="head_bar" expand="lg" variant="dark">
        //         <Navbar.Brand href="/">SuperStore</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //         <Navbar.Collapse className="d-flex justify-content-end align-items-center" id="responsive-navbar-nav">
                
        //             <Nav className="ml-auto">
        //                 <NavItem navName="Home" linkTo='/' />
        //                 <NavItem navName="Deals" linkTo='/deals' />
        //                 <NavItem navName="Cart" linkTo='/cart' />{userState && userState.role === 'admin' ? <NavItem navName="Admin" linkTo='/admin' /> : null}
        //                 <Nav.Link>{signInButton}</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        // </Navbar>
        );
};

export default MyNavbar;