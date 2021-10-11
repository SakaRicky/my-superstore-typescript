import React, { useState } from 'react';

import { BsSearch } from 'react-icons/bs';

import './searchbar.css';

interface SearchProp {
    handleSearch: (searchedItem: string) => void
}

const Searchbar = ({handleSearch}: SearchProp) => {
    const [searchedItem, setSearchedItem] = useState('');

    const search = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
        console.log("Try to prevent default");
        event.preventDefault();
        console.log("Tried to prevent default");
        handleSearch(searchedItem);
    };

    const changeHandler = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedItem(target.value);
        if (target.value === '') {
            handleSearch('');
        }
    };

    return <div className="row py-2 d-flex justify-content-center search">
                <div className="searchArea">
                    <form onSubmit={search} className="input-group md-form form-sm form-2 pl-0">
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
                    </form>
                </div>
            </div>;
};

export default Searchbar;