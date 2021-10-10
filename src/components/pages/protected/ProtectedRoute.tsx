import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { User } from '../../../../types';

const ProtectedRoute = ({component: Component, user, ...rest}: any) => {

    if (!user) {
        return <Redirect to={
            {
              pathname: '/login'
            }
        } />;
    } else if (user.role === "admin") {
        return (
            <Route {...rest} render={
                props => <Component {...rest} {...props} />
            }></Route>
        );
    } else {
        return <Redirect to={
            {
              pathname: '/unauthorized',
            }
        } />;
    }
};

export default ProtectedRoute;