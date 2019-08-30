import { pageConstants } from '../constants';
import { alertActions } from './alert.actions';
import { history } from '../helpers';
import BaseApi from '../api/baseApi';

function getProfile(username, email) {

    function request(_username) { return { type: pageConstants.REQUEST_PROFILE, _username }; }
    function success(profile) { return { type: pageConstants.SUCCESS_PROFILE, profile }; }
    function failure(error) { return { type: pageConstants.FAILED_PROFILE, error }; }

    return dispatch => {
        dispatch(request({ username }));
        history.push('/profile');
        BaseApi.getProfile({ username, email }, (error, profile) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            } else if(profile===""){
                dispatch(success(null));
            } else dispatch(success(profile));
        });
    };
}

function updateProfile(profile) {

    function request(_profile) { return { type: pageConstants.UPDATE_PROFILE_REQUEST, _profile }; }
    function success(_profile) { return { type: pageConstants.UPDATE_PROFILE_SUCCESS, _profile }; }
    function failure(error) { return { type: pageConstants.UPDATE_PROFILE_FAILED, error }; }

    return dispatch => {
        dispatch(request(profile));
        BaseApi.updateProfile(profile, (error) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            } else {
                dispatch(success({profile}));
            }
        });
    };
}

export const pageActions = {
    getProfile,
    updateProfile,
};

export default pageActions;