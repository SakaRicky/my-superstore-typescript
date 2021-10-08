import React, { useState } from 'react';

import { BsSearch } from 'react-icons/bs';

import './searchbar.css';

interface SearchProp {
    handleSearch: (searchedItem: string) => void
}

const Searchbar = ({handleSearch}: SearchProp) => {
    const [searchedItem, setSearchedItem] = useState('');

    const search = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        handleSearch(searchedItem);
    };

    const changeHandler = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedItem(target.value);
        if (target.value === '') {
            handleSearch('');
        }
    };

    return <div className="row search">
                <div className="col-sm-3 offset-sm-4 mt-3 mb-2">
                    <div className="input-group md-form form-sm form-2 pl-0">
                        <input 
                            className="form-control my-0 py-1 amber-border" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            onChange={changeHandler} />
                        <div className="input-group-append">
                            <span 
                                className="input-group-text amber lighten-3  bg-warning" 
                                id="basic-text1">
                                <i className="fas fa-search text-grey" aria-hidden="true" onClick={search}><BsSearch /></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>;
};

export default Searchbar;