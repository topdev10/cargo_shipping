import { userConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { loggedIn: true, user, verifyCodeRequested: false, vCSuccess: false, cpRequested: false, cpSuccess: false }
    : { verifyCodeRequested: false, vCSuccess: false, cpRequested: false, cpSuccess: false };

export function authentication(state = initialState, action) {
    switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        return {};
    case userConstants.FORGOT_PASSWORD_REQUEST:
        return {
            verifyCodeRequested: true,
            vCSuccess: false,
        };
    case userConstants.FORGOT_PASSWORD_SUCCESS:
        return {
            verifyCodeRequested: false,
            vCSuccess: true,
        };
    case userConstants.FORGOT_PASSWORD_FAILED:
        return {
            verifyCodeRequested: false,
            vCSuccess: false,
        };
    case userConstants.CHANGE_PASSWORD_REQUESTED:
        return {
            ...state,
            cpRequested: true,
            cpSuccess: false,
        };
    case userConstants.CHANGE_PASSWORD_SUCCESS:
        return {
            ...state,
            cpSuccess: true,
        };
    case userConstants.CHANGE_PASSWORD_FAILED:
        return {
            ...state,
            cpRequested: false,
            cpSuccess: false,
        };
    default:
        return state;
    }
}

export default authentication;