import React from 'react';
import PaginationButton from './PaginationButtons/PaginationButton';
import constants from '../../utils/constants';

const PAGE_SIZE = constants.PAGE_SIZE;

interface PaginationProp {
    updatePage: (page: number) => void,
    page: number,
    totalItems: number | undefined
}

const Pagination = ({updatePage, page, totalItems}: PaginationProp) => {

    const number_of_pages = totalItems ? Math.ceil(totalItems/PAGE_SIZE) : 0;

    const handleNextPage = () => {
        updatePage(page+1);
    };

    const handlePreviousPage = () => {
        updatePage(page - 1);
    };

    const handleFirstPage = () => {
        updatePage(1);
    };

    const handleLastPage = () => {
        updatePage(number_of_pages);
    };

    return (
        <PaginationButton 
            currentPage={page} 
            allPages={number_of_pages}
            nextPage={handleNextPage}
            prevPage={handlePreviousPage}
            firstPage={handleFirstPage}
            lastPage={handleLastPage}
        />
    );
};

export default Pagination;