import {  User, CartItemType, ItemType } from "../../types";
import { State } from './state';
import { setStateType } from ".";

export type Action = 
        |{
            type: "INIT_STATE",
            payload: []
        }       
        |{
            type: "SET_USER",
            payload: User
        }
        |{
            type: "SET_CART",
            payload: CartItemType[]
        }
        |{
            type: "ADD_TO_CART",
            payload: {item: ItemType, quantity: number}
        }
       |{
           type: "INCREASE_ITEM_IN_CART",
           payload: CartItemType
       }
       |{
        type: "DECREASE_ITEM_IN_CART",
        payload: CartItemType
       }
       |{
        type: "REMOVE_ITEM_FROM_CART",
        payload: string
       };

export const initiateState = (): Action => {
    return { type: "INIT_STATE", payload: [] };
};
export const setUser = (user: User): Action => {
    return { type: "SET_USER", payload: user };
};

export const setCart = (cart: CartItemType[]): Action => {
    return { type: "SET_CART", payload: cart };
};

export const addToCart = (item: ItemType, quantity: number): Action => {
    return { type: "ADD_TO_CART", payload: {item: item, quantity: quantity} };
};

export const increaseItemInCart = (item: CartItemType): Action => {
    return { type: "INCREASE_ITEM_IN_CART", payload: item };
};

export const decreaseItemInCart = (item: CartItemType): Action => {
    return { type: "DECREASE_ITEM_IN_CART", payload: item };
};

export const removeItemFromCart = (id: string): Action => {
    return { type: "REMOVE_ITEM_FROM_CART", payload: id };
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "INIT_STATE":
            return {
                cart: [],
                user: null
            };

        case "SET_USER":
            return {
                ...state,
                user: action.payload
            };

        case "SET_CART":
            return {
                ...state,
                cart: action.payload
            };
        
        case "ADD_TO_CART": {
            // When Add to Cart Button is clicked to add new item to cart and that item was already inside the Cart
            // If item in cart, find it and update its quantity
            const itemInCart = state.cart.find(i => i.id === action.payload.item.id);
            
            if (itemInCart) {
                // Update the item by incrementing the quantity
                const updatedItemInCart: CartItemType = {
                    ...itemInCart,
                    quantity: itemInCart.quantity + 1,
                    totalPrice: (itemInCart.quantity +1) * itemInCart.price
                };
                // filterout the old item from the cart
                const filteredCartItems = state.cart.filter(i => i.id !== itemInCart.id);

                return {
                    ...state,
                    cart: [...filteredCartItems, updatedItemInCart]
                };

            } else {  // else add it to cart since it's not yet in the cart
                const itemToAddToCart: CartItemType = {
                    ...action.payload.item,
                    quantity: action.payload.quantity,
                    totalPrice: action.payload.quantity * action.payload.item.price
                };
                return {
                    ...state,
                    cart: [...state.cart, itemToAddToCart]
                };
            }
        }
        
        case "INCREASE_ITEM_IN_CART": {
            const itemToIncrease: CartItemType = action.payload;
            // find item in cart
            const itemInCartToIncrease: CartItemType | undefined = state.cart.find(i => i.id === itemToIncrease.id);
            // find it's index, this is to put that item back at that index
            const indexOfItemInCartToIncrease = state.cart.findIndex(i => i.id === itemToIncrease.id);
            // update the item's quantity and total price
            let updatedItemInCart: CartItemType;
            if (itemInCartToIncrease) {
                    updatedItemInCart = {
                    ...itemInCartToIncrease,
                    quantity: itemInCartToIncrease.quantity + 1,
                    totalPrice: itemInCartToIncrease.totalPrice + itemInCartToIncrease.price 
                };
            }
            // create a new array of cart items by maintaining all the other items and replacing
            // the item updated to it's exact index
            const newIncreasedCartItems: CartItemType[] = state.cart.map((item, i) =>  {
                if (i === indexOfItemInCartToIncrease) {
                    return updatedItemInCart;
                }
                return item;
            });
            return {
                ...state,
                cart: newIncreasedCartItems
            };
        }

        case "DECREASE_ITEM_IN_CART": {
            const item = action.payload;
            // find item in cart
            const itemInCartToDecrease: CartItemType | undefined = state.cart.find(i => i.id === item.id);
            // find it's index, this is to put that item back at that index
            const indexOfItemInCartToDecrease = state.cart.findIndex(i => i.id === item.id);
            // update the item's quantity and total price
            let decreasedItemInCart: CartItemType;
            if (itemInCartToDecrease) {
                    decreasedItemInCart = {
                    ...itemInCartToDecrease,
                    quantity: itemInCartToDecrease.quantity - 1,
                    totalPrice: itemInCartToDecrease.totalPrice - itemInCartToDecrease.price 
                };
            }

            // create a new array of cart items by maintaining all the other items and replacing
            // the item updated to it's exact index
            const newDecreasedCartItems: CartItemType[] = state.cart.map((item, i) =>  {
                if (i === indexOfItemInCartToDecrease) {
                    return decreasedItemInCart;
                }
                return item;
            });

            return {
                ...state,
                cart: newDecreasedCartItems
            };
        }

        case "REMOVE_ITEM_FROM_CART": {
            const IDToRemove = action.payload;
            const newCartItems = state.cart.filter(item => item.id !== IDToRemove);
            console.log(newCartItems);
            
            return {
                ...state,
                cart: newCartItems
            };
        }

        default:
            return state;
    }
};