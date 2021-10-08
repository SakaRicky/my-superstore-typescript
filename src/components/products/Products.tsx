import React from 'react';

import ProductCard from './ProductCard/ProductCard';
import './products.css';
import { ItemType } from '../../../types';

interface ProductsProp {
    items: ItemType[]
}
const Products = ({items}: ProductsProp) => {

    return (
        <div className="container mt-5">
            <div className="row">
                {items.map(item => {
                    return (
                        <div className="col-md-4 col-sm-6 my-3" key={item.id}>
                            <ProductCard
                                    name={item.name}
                                    imgUrl={item.imageUrl} 
                                    description={item.description} 
                                    price={item.price}
                                    average_rating={item.avgRating}
                                    isOnSale={item.isOnSale}
                                    item_id={item.id}
                                />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;