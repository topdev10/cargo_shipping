import { userConstants } from '../constants';
import { alertActions } from './alert.actions';
import { history } from '../helpers';
import BaseApi from '../api/baseApi';

function login(email, password, checked, company) {

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

    return dispatch => {
        dispatch(request({ email }));
        BaseApi.login(email, password, checked, (error, res) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
            else if( res != null ){
                dispatch(success({email: res.uemail, username: res.username , token: res.token, password, company}));
                dispatch(alertActions.success("login success"));
                history.push('/pages/dashboard');
            }
        });
    };
}

function verifyToken({username, token}) {

    function request(_username) { return { type: userConstants.LOGIN_WITH_TOKEN_REQUEST, _username }; }
    function success(user) { return { type: userConstants.LOGIN_WITH_TOKEN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_WITH_TOKEN_FAILED, error }; }

    return dispatch => {
        dispatch(request({ username }));
        BaseApi.verifyToken(username, token, (error, user) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
            else if( user != null ){
                dispatch(success({username: user.username, user: user.email}));
            }
        });
    };
}

function activateLinkedinUser({email, username}) {
    function success(user) {
        return {type: userConstants.ACTIVE_LINKEDIN_USER, user};
    };
    return dispatch => {
        dispatch(success({email, username}));
        history.push('/landing');
    };
}

function logout() {
    history.push('/login');
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

function resetPassword(email, password, cpassword, code){
    function request(_email) { return { type: userConstants.CHANGE_PASSWORD_REQUESTED, _email }; }
    function success(_email) { return { type: userConstants.CHANGE_PASSWORD_SUCCESS, _email }; }
    function failure(error) { return { type: userConstants.CHANGE_PASSWORD_FAILED, error }; }

    return dispatch => {
        dispatch(request(email));

        BaseApi.resetPassword(email, password, cpassword, code, (error) => {
            if(error) {
                dispatch(failure(email));
                dispatch(alertActions.error(error.toString()));
            } else {
                dispatch(success(email));
                dispatch(alertActions.success('Change Password Success'));
            }
        });
    };
}

function forgotPassword(email) {        // email can be user email or username
    function request(_email) { return { type: userConstants.FORGOT_PASSWORD_REQUEST, _email }; }
    function success(_email) { return { type: userConstants.FORGOT_PASSWORD_SUCCESS, _email }; }
    function failure(error) { return { type: userConstants.FORGOT_PASSWORD_FAILED, error }; }

    return dispatch => {
        dispatch(request(email));

        BaseApi.forgotPassword(email, (error) => {
            if(error) {
                dispatch(failure(email));
                dispatch(alertActions.error(error.toString()));
            } else {
                dispatch(success(email));
                dispatch(alertActions.success("We've sent you the verification code to your email."));
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
    verifyToken,
    logout,
    register,
    verifyCode,
    forgotPassword,
    resetPassword,
    activateLinkedinUser,
    getAll,
    deleteUser
};

export default userActions;