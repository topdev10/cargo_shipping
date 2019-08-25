import React, { Fragment } from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import store from './store';
import reset from './constants/css/reset';
import App from './components/App';
import Landing from './pages/landing';

const GlobalStyle = createGlobalStyle`${reset}`;
const Routes = (
    <Router>
        <Fragment>
            <Provider store={store}>
                <Switch>
                    <Route path="/Home" component={Landing} />
                    <Route path="/Login" component={App} />
                    <Redirect from="/" to="/Home"></Redirect>
                </Switch>
            </Provider>
            <GlobalStyle />
        </Fragment>
    </Router>
)

export default Routes;