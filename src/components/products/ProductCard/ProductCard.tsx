import React from 'react';
import { Link } from 'react-router-dom';
import { ItemType } from '../../../../types';

import ProductStars from '../../stars/ProductStars';

import './ProductCard.css';

interface ProductProp {
    imgUrl: string,
    description: string
    price: number,
    name: string,
    average_rating: number,
    isOnSale: boolean,
    item_id: string,
    stockCount: number
    toCart: (item: ItemType) => void
}

const ProductCard = ({imgUrl, price, name, average_rating, isOnSale, item_id, description, stockCount, toCart}: ProductProp) => {

    const sendToAddToCart = () => {
        const item: ItemType = {
            imageUrl: imgUrl,
            description: description,
            price: price,
            name: name,
            avgRating: average_rating,
            isOnSale: isOnSale,
            id: item_id,
            stockCount: stockCount
        };
        toCart(item);
    };

    return (
        <div className="card">
            <div className="center pt-3"><img className="card-img-top img" src={imgUrl} alt={name} /></div>
            <div className="card-body">
                <p className="mb-0"><Link to={`item/${item_id}`}>{name}</Link></p>
                <ProductStars average_rating={average_rating} />
                <div>
                    <p className="card-text">
                        <strong>
                            ${price}
                            { isOnSale && <span className="onSale ml-2">On Sale</span>}
                        </strong>
                    </p>
                </div>
            </div>
            <div className='my-3 d-flex justify-content-between'>
                <Link to={`item/${item_id}`} className="btn btn-primary center">View Item</Link>
                <button className="btn center add_cart" onClick={sendToAddToCart}>Add to Chart</button>
            </div>
        </div>
    );
};

export default ProductCard;