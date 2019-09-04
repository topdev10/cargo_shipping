import { combineReducers } from 'redux';
import authReducer from './authentication.reducer';
import alertReducer from './alert.reducer';
import registReducer from './registration.reducer';
import pageReducer from './page.reducer';
import quoteReducer from './quote.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    regist: registReducer,
    page: pageReducer,
    quote:quoteReducer,
});

export default rootReducer;