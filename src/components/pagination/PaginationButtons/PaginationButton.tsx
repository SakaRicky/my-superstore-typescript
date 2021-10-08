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

const NavButtons = ({currentPage, allPages, nextPage, prevPage, firstPage, lastPage}: NavButtonProp) => {

    return (
        <div className="pagination-button text-center mb-4 mt-4">
            <button className="mx-3"  onClick={() => firstPage()} disabled={currentPage===1}>First</button>
            <button onClick={() => prevPage()} disabled={currentPage===1}> &lt; </button>
            <span className="mx-3">{allPages ? currentPage:null} - {allPages ? allPages:null}</span>
            <button onClick={() => nextPage()} disabled={currentPage===allPages}> &gt; </button>
            <button className="mx-3"  onClick={() => lastPage()} disabled={currentPage===allPages}>Last</button>
        </div>
    );
};

export default NavButtons;