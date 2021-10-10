import React, { useState, useEffect } from "react";
import { useStateValue, addToCart } from "../../../state";
import { useParams } from 'react-router-dom';
import { CartItemType, ItemType } from "../../../../types";
import services from "../../../services/items";
import ProductStars from '../../stars/ProductStars';
import Notification from '../../notifications/Notification';
import './item.css';

const Item = () => {
    
    const [state, dispatch] = useStateValue();
    const [item, setItem] = React.useState<ItemType>();
    const [item_number, setItemNumber] = useState(1);
    const [error_displayed, setErrorMessage] = useState('');
    const [addedToCartMessage, setAddedToCartMessage] = useState(false);
    

    // Used to check if this item? is already in the cart and display the message
    const itemInCart = state.cart.find(cartItem => {
        return cartItem.id === item?.id;
    });

    const params = useParams<{ id: string }>();
    // const item = itemState;

    useEffect(() => {
        const fetch_item = async () => {            
            const fetched_item = await services.getItem(params.id);
            setItem(fetched_item);
        };
        fetch_item();
    }, [params.id]);

    useEffect(() => {
        if (item) {
            if (item.stockCount < 1) {
                setErrorMessage('Item no longer in stock');
            }
        }
    }, []);

    const increase_quantity = () => {
        if (item_number === item?.stockCount) {
            setErrorMessage('Insufficient stock!');
        } else {
            if (item && item_number <= item?.stockCount && item_number > 0) {
                setErrorMessage('');
            }
            setItemNumber(item_number+1);
        }
    };

    const decrease_quantity = () => {
        if (item_number <= 1) {
            setErrorMessage('Invalid number of items');
        } else {
            if (item && item_number <= item.stockCount && item_number > 0) {
                setErrorMessage('');
            }
            setItemNumber(item_number-1);
        }
    };
    const addItemToCart = () => {
        // Dispatch here
        // dispatch({type: cartTypes.ADDTOCART, data: {...item?, item_number}});
        if (item) {
            dispatch(addToCart(item, item_number));
            setAddedToCartMessage(true);
            setItem({...item, stockCount: item?.stockCount-item_number});
            setTimeout(() => {
                setAddedToCartMessage(false);
            }, 5000);
        }
    };

    const stockStyle = item && item.stockCount < 1 ? "bg-danger " : "bg-success ";

    // disable the button if stockCount is 0
    const disable = item?.stockCount === 0 ? true : false;
    const disableClass = item?.stockCount === 0 ? 'disable-btn' : 'enable-btn';

    return (
        // <div></div>
        <div className='col'>
            <div className='row text-center'>
                {addedToCartMessage && 
                    <div className="col-md-6 offset-md-3 alert alert-success" role="alert">
                        <Notification message={`Added ${item_number} ${item?.name} to Cart`} />
                    </div>
                }
            </div>
            <div className='row item description'>
                <div className="col-sm image_wrapper d-flex justify-content-end">
                    <img className="float-sm-right" src={item?.imageUrl} alt={item?.name}/>
                </div>
                <div className="col-sm">
                    <p><strong>{item?.name}</strong></p>
                    <div><ProductStars average_rating={item ? item.avgRating : 0} /></div>
                    <hr className="line"></hr>
                    <p>{item?.description}</p>
                    <p className="my-3"><strong>${item?.price}</strong></p>
                    <div className="my-3">Available in stock: <span className={stockStyle + "px-3 py-1 text-white"}>{item?.stockCount}</span></div>
                    <div>Quantity: <span className="quantity text-white">{item_number}</span></div>
                    <div className="my-3 d-flex justify-content-between control-btn">
                        <button className="bg-primary" onClick={decrease_quantity}>-</button>
                        <button className="bg-primary" onClick={increase_quantity}>+</button>
                    </div>
                    <div className="my-3"><button className={disableClass} onClick={addItemToCart} disabled={disable}>Add to Cart</button></div>
                    {error_displayed && <div className="alert alert-danger" role="alert"><Notification message={error_displayed} /></div>}
                    {itemInCart && <div className="available_in_cart">1 of this item? is currently in your cart</div>}
                </div>
            </div>
        </div>
    );
    
};

export default Item;