import React, { Fragment } from 'react';
import { Route, Redirect, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from './helpers';
import AuthRoute from './components/PrivateRoute';
import Landing from './pages/landing';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Header from './components/header';
import ProfilePage from './pages/profile/profile';
import TokenAuthComponent from './components/tokenAuthComponent';
import LIAuthcomponent from './components/linkedinAuthComponent';
import CustomNativationMenu from './components/CustomNavigationMenu';
import Dashboard from './pages/dashboard/Dashboard';
import Quotes from './pages/quotes/quotes';
import Shipments from './pages/shipments/shipments';
import Billing from './pages/billing/billing';
import Reports from './pages/Reports/reports';
import Booking from './pages/booking/booking';

import AlertFunction from './components/FunctionalComponents/AlertFunction';

const Routes = (props) => {
    // alert.show('oh look, an alert!');
    const { username, alerts } = props;
    return (
        <Router history={history}>
            <Fragment>
                {alerts !== null && <AlertFunction />}
                {username !== 'newuser' && <Header></Header>}
                <Switch>
                    <AuthRoute exact path="/landing" component={Landing}/>
                    <AuthRoute exact path="/Profile" component={ProfilePage}/>
                    <Route path="/auth/:username/:token" component={TokenAuthComponent}/>
                    <Route path="/linkedIn/:email/:username" component={LIAuthcomponent} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Signup" component={Signup} />
                    {
                        username!=='newuser'&&
                        <AuthRoute path="/pages" component={CustomNativationMenu}>
                            <CustomNativationMenu></CustomNativationMenu>
                            <AuthRoute path="/pages/dashboard" component={Dashboard}/>
                            <AuthRoute path='/pages/quotes' component={Quotes}/>
                            <AuthRoute path='/pages/shipments' component={Shipments}/>
                            <AuthRoute path='/pages/billing' component={Billing}/>
                            <AuthRoute path='/pages/booking' component={Booking}/>
                            <AuthRoute path='/pages/reports' component={Reports}/>
                        </AuthRoute>
                    }
                    <Redirect from="/" to="/landing"></Redirect>
                </Switch>
            </Fragment>
        </Router>
    );
};

Routes.defaultProps = {
    alerts: null,
};

Routes.propTypes = {
    username: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    alerts: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        username: state.auth.user ? state.auth.user.email : "newuser",
        alerts: state.alert
    };
}
export default connect(mapStateToProps)(Routes);