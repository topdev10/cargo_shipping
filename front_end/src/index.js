import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import AlertTemplate from './components/AlertTemplate';
import store from './store';
import Routes from './routes';
import reset from './constants/css/reset';
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`${reset}`;
// optional cofiguration
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_RIGHT,
    timeout: 100000,
    offset: '10px 10px',
    // you can also just use 'scale'
    transition: transitions.FADE,
};

const App = () => (
    <Provider store={store}>
        <Routes />
        <GlobalStyle />
    </Provider>
);

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);