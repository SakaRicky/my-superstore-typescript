import React from 'react';
import './cartItem.css';
import {CartItemType} from '../../../../../types';
import {NotifyStateProp} from '../Cart';

type CartItemProp = {
    item: CartItemType,
    notify: (notification: NotifyStateProp) => void,
    increaseItem: (item: CartItemType) => void,
    decreaseItem: (item: CartItemType) => void,
    remove: (id: number) => void,
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

    return (
        <li>
            <div className="row cart-border row-sm-4">
                <div className="col-xs-4 d-flex justify-content-center col-sm-4 col-md-4 col-lg-3 px-sm-3">
                    <img className="card-img-top img center cart-img" src={item.imageUrl} alt={item.name} />
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 px-sm-3">
                    <div className="row p-2"><strong>{item.name}</strong></div>
                    <div className="row px-2">Available in stock: <span className={stockStyle + "px-3 text-white"}>{item.stockCount}</span></div>
                    <div className="row p-2">
                        <div className="col">Quantity: <span className="quantity text-white py-1">{item.quantity}</span></div>
                        <div className="col"><span className="text-primary button" onClick={() => remove(Number(item.id))}>Remove</span></div>
                    </div>
                    <div className="row py-2">
                        <button className="ml-4 bg-primary control_btn" onClick={decrease_quantity}>-</button>
                        <button className="ml-3 bg-primary control_btn" onClick={increase_quantity}>+</button>
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