import React from 'react';
import { Link } from 'react-router-dom';
import './thankyou.css';

const thankyou = () => {
    return <div className="container thankyou-message">
        <div className='row center'>
            <h1>Thank you for your purchase!</h1>
        </div>
        <div className='row center message'>
            Your order will be on its way shortly. In the mean time, please feel free to continue shopping!
        </div>
        <div className='row'>
            <Link className="center return-home" to='/'>Return to Home</Link>
        </div>
    </div>;
};

export default thankyou;