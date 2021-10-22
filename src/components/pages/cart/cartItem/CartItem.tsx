import React from 'react';
import './cartItem.css';
import {CartItemType} from '../../../../../types';
import {NotifyStateProp} from '../Cart';

type CartItemProp = {
    item: CartItemType,
    notify: (notification: NotifyStateProp) => void,
    increaseItem: (item: CartItemType) => void,
    decreaseItem: (item: CartItemType) => void,
    remove: (id: string) => void,
    // children: string
};

const CartItem = ({item, notify, increaseItem, decreaseItem, remove,}: CartItemProp) => {
    
    const increase_quantity = () => {
        if (item.quantity === item.stockCount) {
            notify({
                message: 'Insufficient stock!',
                class: 'alert alert-danger'
            });
        } else {
            if (item.quantity <= item.stockCount && item.quantity > 0) {
                notify(undefined);
            }
            increaseItem(item);
        }
    };

    const decrease_quantity = () => {
        if (item.quantity <= 1) {
            notify({
                message: 'Invalid number of items',
                class: 'alert alert-danger'
            });
        } else {
            if (item.quantity <= item.stockCount && item.quantity > 0) {
                notify(undefined);
            }
            decreaseItem(item);
        }
    };

    const stockStyle = item.stockCount < 1 ? "bg-danger " : "bg-success ";

    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" className="text-danger icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>;
    
    const increaseIcon = <svg onClick={increase_quantity} xmlns="http://www.w3.org/2000/svg" className="text-success icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>;
    
    const decreaseIcon = <svg onClick={decrease_quantity} xmlns="http://www.w3.org/2000/svg" className="text-success icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                        </svg>;    

    return (
        <li>
            <div className="row cart-border row-sm-4">
                <div className="col-xs-4 d-flex justify-content-center col-sm-4 col-md-4 col-lg-3 px-sm-3">
                    <img className="card-img-top img center cart-img" src={item.imageUrl} alt={item.name} />
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 px-sm-3">
                    <div className="row py-2"><strong>{item.name}</strong></div>
                    <div className="">Available in stock: <span className={stockStyle + "px-3 text-white"}>{item.stockCount}</span></div>
                    <div className="row py-2">
                        <div className="">Quantity: <span className="quantity text-white py-1">{item.quantity}</span></div>
                        <div className="mt-2"><span className="button text-danger" onClick={() => remove(item.id)}>{deleteIcon}</span></div>
                    </div>
                    <div>
                        {decreaseIcon}
                        {increaseIcon}
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-5 px-sm-3">
                    <div className="d-flex justify-content-end"><h4><strong>${item.totalPrice.toFixed(2)}</strong></h4></div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;