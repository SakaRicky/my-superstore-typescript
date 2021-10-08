import React from 'react';
import FullStar from './stars/FullStart';
import HalfStar from './stars/HalfStar';
import EmptyStar from './stars/EmptyStar';

const ProductStars: React.FC<{average_rating: number}> = ({average_rating}: {average_rating: number}): JSX.Element => {
    const stars = [];

    const number_of_full_stars = Math.trunc(average_rating);
    const number_of_half_stars = average_rating % 1 > 0 ? 1 : 0;
    const number_of_empty_stars = 5 - (number_of_full_stars+number_of_half_stars);

    for (let i = 0; i < number_of_full_stars; i++) {
        stars.push(<FullStar key={`full_star_${i}`}/>);
    }
    for (let i = 0; i < number_of_half_stars; i++) {
        stars.push(<HalfStar key={`half_star_${i}`}/>);
    }
    for (let i = 0; i < number_of_empty_stars; i++) {
        stars.push(<EmptyStar key={`empty_star_${i}`}/>);
    }

    return <>{stars}</>;
};

export default ProductStars;