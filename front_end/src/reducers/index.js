import { combineReducers } from 'redux';
import authReducer from './authentication.reducer';
import alertReducer from './alert.reducer';
import registReducer from './registration.reducer';
import pageReducer from './page.reducer';
import quoteReducer from './quote.reducer';
import billReducer from './bill.reducer';
import reportReducer from './report.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    regist: registReducer,
    page: pageReducer,
    quote:quoteReducer,
    bill:billReducer,
    report: reportReducer,
});

export default rootReducer;