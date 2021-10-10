import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Home from './components/pages/home/Home';
import Deals from './components/pages/deals/Deals';
import Cart from './components/pages/cart/Cart';
import Item from './components/pages/item_page/Item';
// import Admin from './components/pages/admin/Admin' ;
// import Thankyou from './components/pages/thankyou/Thankyou';
// import Login from './components/pages/login/Login';
// import { useUserState, userTypes } from './state/user';
// import { useCartState, cartTypes } from './state/cart';
// import cartService from './services/cart';
// import ProtectedRoute from './components/pages/protected/ProtectedRoute';
// import UnAuthorized from './components/pages/unauthorized/unAuthorized';

const App = () => {
  // Using states here to set them from local storage when the opens the app
  // const { userState,  userDispatch } = useUserState();
  // const { cartDispatch } = useCartState();

  // useEffect(() => {
  //   const loggedUser = window.localStorage.getItem('loggedUser');
  //   if (loggedUser) {
  //     const user = JSON.parse(loggedUser);
  //     userDispatch({type: userTypes.SETUSER, data: user});
  //     cartDispatch({type: cartTypes.SETCART, data: user.cart});
  //     // set the user's token for making requests to backend
  //     cartService.setToken(user.token);
  //   }
  // }, [userDispatch, cartDispatch]);

  return (
        <div>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/deals'>
                <Deals />
              </Route>
              <Route path='/cart'>
                <Cart />
              </Route>
              <Route path='/item/:id'>
                <Item />
              </Route>

              {/* <ProtectedRoute path='/admin' user={userState} component={Admin} /> */}

              <Route path='/thankyou'>
                {/* <Thankyou /> */}
              </Route>
              <Route path='/login'>
                {/* <Login /> */}
              </Route>
              <Route path='/unauthorized'>
                {/* <UnAuthorized /> */}
              </Route>
            </Switch>
          </Router>
        </div>   
  );
};

export default App;
