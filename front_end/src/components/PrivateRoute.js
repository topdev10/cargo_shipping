import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { username } = {...rest};
    return (
        <Route {...rest} render={props => (
            username!=='newuser'
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login' }} />
        )} />
    );   
};

function mapStateToProps(state) {
    return {
        username: state.auth.user?state.auth.user.email:"newuser",
    };
}
export default connect(mapStateToProps)(PrivateRoute);