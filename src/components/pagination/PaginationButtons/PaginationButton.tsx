import React from 'react';

import './paginationButton.css';

interface NavButtonProp {
    currentPage: number,
    allPages: number,
    nextPage: () => void,
    prevPage: () => void,
    firstPage: () => void,
    lastPage: () => void,
}

const increaseIcon = <svg xmlns="http://www.w3.org/2000/svg" className="text-primary icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>;
    
const decreaseIcon = <svg xmlns="http://www.w3.org/2000/svg" className="text-primary icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>;

const NavButtons = ({currentPage, allPages, nextPage, prevPage, firstPage, lastPage}: NavButtonProp) => {

    return (
        <div className="pagination-button text-center mb-4 mt-4">
            <button className="mx-3"  onClick={() => firstPage()} disabled={currentPage===1}>First</button>
            <button onClick={() => prevPage()} disabled={currentPage===1}> {decreaseIcon} </button>
            <span className="mx-3">{allPages ? currentPage:null} - {allPages ? allPages:null}</span>
            <button onClick={() => nextPage()} disabled={currentPage===allPages}> {increaseIcon} </button>
            <button className="mx-3"  onClick={() => lastPage()} disabled={currentPage===allPages}>Last</button>
        </div>
    );
};

export default NavButtons;