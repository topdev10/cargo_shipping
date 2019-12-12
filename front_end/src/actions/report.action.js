import { reportConstants } from '../constants';
import { alertActions } from './alert.actions';
import BaseApi from '../api/baseApi';

function requestNewReport(report) {
    function request(_data) {return { type: reportConstants.REQUEST_NEW_REPORT, _data};};
    function success(_data) {return { type: reportConstants.SUCCESS_NEW_REPORT, _data};};
    function failure(error) {return { type: reportConstants.FAILED_NEW_REPORT, error};};

    return dispatch => {
        dispatch(request(report));

        BaseApi.requestNewReport(report, (error, result) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            } else if(result) {
                dispatch(success(report));
            }
        });
    };
}

export const reportActions = {
    requestNewReport,
};

export default reportActions;