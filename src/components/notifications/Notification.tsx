import React from 'react';

const CartNotification = ({message}: {message: string}) => {    
    return <div className="text-center">{message}</div>;
};

export default CartNotification;