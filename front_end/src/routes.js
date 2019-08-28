import React, { Fragment } from 'react';
import { Route, Redirect, Router , Switch } from 'react-router-dom';
import { Provider} from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { history } from './helpers';
import store from './store';
import reset from './constants/css/reset';
import AuthRoute from './components/PrivateRoute';
import Landing from './pages/landing';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

const GlobalStyle = createGlobalStyle`${reset}`;
const Routes = (
    <Router history={history}>
        <Fragment>
            <Provider store={store}>
                <Switch>
                    <AuthRoute path="/Home" component={Landing} />
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