import React, { useState, useEffect } from 'react';
import Products from '../../products/Products';
import SearchBar from '../../searchbar/Searchbar';
import fetchItemList from '../../../services/items';

// import './home.css';
import Pagination from '../../pagination/Pagination';
import constants from '../../../utils/constants';

// avgRating: 4
// description: "Men shoe white color"
// id: "6096f909d37ecb3d2e2c4a20"
// imageUrl: "https://as1.ftcdn.net/v2/jpg/02/76/37/72/500_F_276377230_EgsMAmg8j0d7FprWRqUsid7moq0Knh9r.jpg"
// isOnSale: true
// name: "Men Shoe White"
// price: 99
// stockCount: 300

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalItems, setTotalItems] = useState<number>();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string | undefined>('');

    // eslint-disable-next-line
    useEffect(() => {
        // fetches for all the data in the backend
        const fetch_data = async () => {
            // Calculate the "from" of the query params 
            const request_from = (page - 1) * constants.PAGE_SIZE;
            const params = {
                from: request_from,
                q: search,
                isOnSale: false
            };
            // Get the items of the backend for the current page
            // const data_items = await fetchItemList(params)
            const data_items = await fetchItemList(params);
            // Set number of pages in pagination
            setTotalItems(data_items.total);
            setItems(data_items.items);
            setIsLoading(false);
        };

        fetch_data();
    }, [page, search]);

    // called when a user does a search with the searchBar component
    const handleSearch = async (searchItem: string) => {
        if (searchItem === '') {
            setSearch('');
            setPage(1);
        } else {
            setPage(1);
            setSearch(searchItem);
        }  
    };

    const updatePage = (page: number) => {
        setPage(page);
    };

    return (
        <div className="container-fluid">
            <SearchBar handleSearch={handleSearch}/>
            {items.length === 0 && !isLoading ? <h3 className="no-item">No items matched your search</h3> : <Products items={items}/>};
            <Pagination updatePage={updatePage} page={page} totalItems={totalItems} />
        </div>
        
    );
};

export default Home;