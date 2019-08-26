import { LOGIN, SIGNUP } from '../actions/authactions';

const initialState = {
    actionType: LOGIN,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN:
        return { ...state, actionType: action.type };
    case SIGNUP:
        return { ...state, actionType: action.type };
    default:
        return state;
    }
};

export default authReducer;