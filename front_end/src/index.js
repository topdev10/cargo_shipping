import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import store from './store';
import Routes from './routes';
import reset from './constants/css/reset';
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`${reset}`;
const App = () => (
    <Provider store={store}>
        <Routes />
        <GlobalStyle />
    </Provider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);