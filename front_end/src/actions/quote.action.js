import { quoteConstants } from '../constants';
import { alertActions } from './alert.actions';
// import { history } from '../helpers';
import BaseApi from '../api/baseApi';

function requestFreightQuote(data) {
    function request(_data) {return { type: quoteConstants.REQUEST_FREIGHT_QUOTE, _data};};
    function success(_data) {return { type: quoteConstants.SUCCESS_FREIGHT_QUOTE, _data};};
    function failure(error) {return { type: quoteConstants.FAILED_FREIGHT_QUOTE, error};};
    
    return dispatch => {
        dispatch(request(data));

        BaseApi.requestNewQuote(data, (error, result) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            } else if(result){
                dispatch(success(data));
            }
        });
    };
}

function onNewFreightQuote() {
    return {
        type: quoteConstants.ON_NEW_FREIGHT_QUOTE,
    };
}

function onReviewFreightQuote(data) {
    return {
        type: quoteConstants.ON_REVIEW_FREIGHT_QUOTE,
        quote: data
    };
}

export const quoteActions = {
    requestFreightQuote,
    onNewFreightQuote,
    onReviewFreightQuote,
};

export default quoteActions;