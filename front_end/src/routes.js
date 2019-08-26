import React, { Fragment } from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import store from './store';
import reset from './constants/css/reset';
import Landing from './pages/landing';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

const GlobalStyle = createGlobalStyle`${reset}`;
const Routes = (
    <Router>
        <Fragment>
            <Provider store={store}>
                <Switch>
                    <Route path="/Home" component={Landing} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Signup" component={Signup} />
                    <Redirect from="/" to="/Home"></Redirect>
                </Switch>
            </Provider>
            <GlobalStyle />
        </Fragment>
    </Router>
);

export default Routes;