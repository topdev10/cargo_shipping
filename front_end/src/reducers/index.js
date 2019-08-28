import { combineReducers } from 'redux';
import authReducer from './authentication.reducer';
import alertReducer from './alert.reducer';
import registReducer from './registration.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    regist: registReducer
});

export default rootReducer;