import { userConstants } from '../constants';
import { alertActions } from './alert.actions';
import { history } from '../helpers';
import BaseApi from '../api/baseApi';

function login(email, password, checked) {

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

    return dispatch => {
        dispatch(request({ email }));
        BaseApi.login(email, password, checked, (error) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
            else {
                dispatch(success({email, password}));
                history.push('/Home');
            }
        });
    };
}

function logout() {
    BaseApi.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {

    function request(_user) { return { type: userConstants.REGISTER_REQUEST, _user }; }
    function success(_user) { return { type: userConstants.REGISTER_SUCCESS, _user }; }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

    return dispatch => {
        dispatch(request(user));

        BaseApi.signup(user, (error) => {
            if(!error){
                dispatch(success(user));
                // history.push('/login');
                dispatch(alertActions.success('Registration successful'));
            } else {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        });
    };
}

function verifyCode(code, email) {
    function request(_code) { return { type: userConstants.VERIFY_REQUEST, _code }; }
    function success(_code) { return { type: userConstants.VERIFY_SUCCESS, _code }; }
    function failure(error) { return { type: userConstants.VERIFY_FAILURE, error }; }

    return dispatch => {
        dispatch(request(code));

        BaseApi.verifyCode({code, email}, (error) => {
            if(error) {
                dispatch(failure(code));
                dispatch(alertActions.error(error.toString()));
            } else {
                dispatch(success(code));
                history.push('/login');
                dispatch(alertActions.success('Code Verification Success'));
            }
        });
    };
}

function getAll() {
    function request() { return { type: userConstants.GETALL_REQUEST }; }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error }; }

    return dispatch => {
        dispatch(request());

        BaseApi.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
    function request(_id) { return { type: userConstants.DELETE_REQUEST, _id }; }
    function success(_user) { return { type: userConstants.DELETE_SUCCESS, _user }; }
    function failure(_id, error) { return { type: userConstants.DELETE_FAILURE, _id, error }; }

    return dispatch => {
        dispatch(request(id));

        BaseApi.delete(id)
            .then(
                _user => dispatch(success(_user)),
                error => dispatch(failure(id, error.toString()))
            );
    };
}

export const userActions = {
    login,
    logout,
    register,
    verifyCode,
    getAll,
    deleteUser
};

export default userActions;