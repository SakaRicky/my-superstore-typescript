import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { 
    useStateValue,
    increaseItemInCart,
    decreaseItemInCart,
    removeItemFromCart,
    initiateState
} from '../../../state';
import CartItem from './cartItem/CartItem';
import Notification from '../../notifications/Notification';
import cartServices from '../../../services/cart';
import './cart.css';
import { CartItemType } from '../../../../types';


export type NotifyStateProp = {
    message: string,
    class: string
} | undefined;

const Cart = () => {
    const [state, dispatch] = useStateValue();
    const [notification, setNotification] = useState<NotifyStateProp>();

    const cartItems = state.cart;

    useEffect(() => {
        // const loggedUser = window.localStorage.getItem('loggedUser');
        // if (loggedUser) {
        //     const user = JSON.parse(loggedUser);
        //     // cartDispatch({type: cartTypes.SETCART, data: user.cart});
        //     dispatch(increaseItemInCart(user.cart));
        //     cartServices.setToken(user.token);
        // }
        if (cartItems.length === 0) {            
            notify({
                message: "Cart empty for now",
                class: "alert alert-danger"
            });
        }
    }, [dispatch, cartItems]);
    
    const notify = (notification: NotifyStateProp) => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(undefined);
        }, 5000);
    };

    const history = useHistory();

    const updateIncreaseCartItem = (item: CartItemType) => {
        // Dispatch here to increase item in cart
        dispatch(increaseItemInCart(item));
    };

    const updateDecreaseCartItem = (item: CartItemType) => {
        // Dispatch here to decrease item in cart
        // cartDispatch({type: cartTypes.DECREASECARTITEM, data: item});
        dispatch(decreaseItemInCart(item));

    };

    const remove =(id: string) => {
        //Dispatch here
        // cartDispatch({type: cartTypes.REMOVEFROMCART, data: id});
        console.log("Remove item from cart");
        
        dispatch(removeItemFromCart(id));

    };

    const checkout = () => {
        // cartDispatch({type: cartTypes.INITSTATE});
        dispatch(initiateState());
        history.push('/thankyou');
    };

    const saveCurrentcart = async () => {
        const response = await cartServices.saveCart(cartItems);
        if (response.status === 204) {
            notify({
                message: "Cart saved succesfully",
                class: "alert alert-success"
            });
        }
    };    

    // Extract all total prices and compute the total price for all items in the cart
    const total_prices_array = cartItems.map(cart_item => cart_item.totalPrice);
    const all_total_prices = total_prices_array.length !== 0 ? total_prices_array.reduce((acc, current_val) => acc + current_val) : null;

    return (<div className="row">
                <div className="col">
                    {notification ? <div className="row">
                                                <div className={`col-sm-6 offset-sm-3 ${notification.class}`} role="alert">
                                                    <Notification message={notification.message} />
                                                </div>
                                            </div> : null}
                    <div className="row">
                        <div className="col py-5 mx-4">
                            <div className="row">
                                <div className="col-sm-8 offset-sm-2 p-0">
                                    <h1 className="py-5">Shopping Cart</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-8 offset-xs-2 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                                    <ul className="list-group cart-list">
                                        {cartItems.map(item => {
                                            return <CartItem
                                                        key={item.id}
                                                        item={item}
                                                        notify={notify}
                                                        increaseItem={updateIncreaseCartItem}
                                                        decreaseItem={updateDecreaseCartItem}
                                                        remove={remove}
                                                    />;
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-8 offset-xs-2 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                                    <div className="row py-5">
                                        <div className="col"><button className="btn btn-lg checkout-btn" onClick={checkout}><strong>Checkout</strong></button></div>
                                        <div className="col"><button className="btn btn-lg saveCart-btn" onClick={saveCurrentcart}><strong>Save cart</strong></button></div>
                                        <div className="col d-flex justify-content-end "><h4><strong>Total: ${all_total_prices}</strong></h4></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
};

export default Cart;