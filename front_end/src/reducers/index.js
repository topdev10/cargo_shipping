import { combineReducers } from 'redux';
import authReducer from './authentication.reducer';
import alertReducer from './alert.reducer';
import registReducer from './registration.reducer';
import pageReducer from './page.reducer';
import quoteReducer from './quote.reducer';
import billReducer from './bill.reducer';
import reportReducer from './report.reducer';
import menuReducer from './menu.reducer';
import bookingReducer from './booking.reducer';
import  shipReducer from './ship.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    regist: registReducer,
    page: pageReducer,
    quote:quoteReducer,
    bill:billReducer,
    report: reportReducer,
    menu: menuReducer,
    booking: bookingReducer,
    ships: shipReducer,
});

export default rootReducer;