import React, { Fragment } from 'react';
import { Route, Redirect, Router , Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from './helpers';
import AuthRoute from './components/PrivateRoute';
import Landing from './pages/landing';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Header from './components/header';
import Profile from './pages/profile/profile';

export const Routes = (props) => {
    const { username } = props;
    return (
        <Router history={history}>
            <Fragment>
                {username!=='newuser'&&<Header></Header>}
                <Switch>
                    <AuthRoute exact path="/Home" component={Landing} />
                    <AuthRoute exact path="/Profile" component={Profile} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Signup" component={Signup} />
                    <Redirect from="/" to="/Home"></Redirect>
                </Switch>
            </Fragment>
        </Router>
    );
};

Routes.propTypes = {
    username: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        username: state.auth.user?state.auth.user.email:"newuser",
    };
}
export default connect(mapStateToProps)(Routes);