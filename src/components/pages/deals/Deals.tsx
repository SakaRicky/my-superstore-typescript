import React, { useState, useEffect } from 'react';

import itemServices from '../../../services/items';
import ProductsOnDeals from '../../products/Products';
import SearchBar from '../../searchbar/Searchbar';
import { useStateValue, addToCart } from '../../../state';
import './deals.css';
import Pagination from '../../pagination/Pagination';
import constants from '../../../utils/constants';
import { ItemType } from '../../../../types';

const Deals = () => {
    const [ state, dispatch ] = useStateValue();
    const [deals, setDeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetch_deals = async () => {
            // Calculate the "from" of the query params 
            const request_from = (page - 1) * constants.PAGE_SIZE;
            // Query made to look for deals and from a certain number
            const params = {
                isOnSale: true,
                from: request_from,
                q:search
            };
            const response_deals = await itemServices.fetchItemList(params);
            // Set the received deals
            setDeals(response_deals.items);
            // set number of pages
            setTotalItems(response_deals.total);
            
            setIsLoading(false);
        };

        fetch_deals();
    }, [page, search]);

    // called when a user does a search with the searchBar component
    const handleSearch = async (searchItem: string) => {
        if (searchItem === '') {
            setSearch('');
        } else {
            setSearch(searchItem);
        } 
    };

    const updatePage = (page: number) => {
        setPage(page);
    };

    const addItemToCart = (item: ItemType) => {
        dispatch(addToCart(item, 1));
    };

    // If it's no more loading but the deals state still has length 0, there are no deals in the backend
    const deals_to_display = isLoading === false && deals.length === 0 ? <div className="noDeals"><h1>No Deals available at the moment</h1></div> : <ProductsOnDeals toCart={addItemToCart} items={deals}/>;

    return (
            <div>
                <SearchBar handleSearch={handleSearch}/>
                <div className="row">
                    {deals.length === 0 && !isLoading ? <h3 className="no-item">No Deals matched your search</h3> : deals_to_display}
                </div>
                <Pagination updatePage={updatePage} page={page} totalItems={totalItems} />
            </div>
    );
};

export default Deals;