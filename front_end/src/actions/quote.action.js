import { quoteConstants } from '../constants';
import { alertActions } from './alert.actions';
// import { history } from '../helpers';
import BaseApi from '../api/baseApi';

function requestFreightQuote(e, quote, token) {
    function request(_data) {return { type: quoteConstants.REQUEST_FREIGHT_QUOTE, _data};};
    function success(_data) {return { type: quoteConstants.SUCCESS_FREIGHT_QUOTE, quote: _data};};
    function failure(error) {return { type: quoteConstants.FAILED_FREIGHT_QUOTE, error};};
    
    return dispatch => {
        dispatch(request(quote));

        BaseApi.requestNewQuote({quote, token}, (error, result) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error("Add New Report Failed!"));
            } else if(result){
                dispatch(alertActions.success("Add New Report Success!"));
                dispatch(success(quote));
            }
        });
    };
}

function onNewFreightQuote() {
    return {
        type: quoteConstants.ON_NEW_FREIGHT_QUOTE,
    };
}

function onCancelFreightQuote() {
    return {
        type: quoteConstants.ON_CANCEL_FREIGHT_QUOTE
    };
}

function onReviewFreightQuote(data) {
    return {
        type: quoteConstants.ON_REVIEW_FREIGHT_QUOTE,
        quote: data
    };
}

function backRequestFreightQuote() {
    return {
        type: quoteConstants.BACK_REQUEST_QUOTE,
    };
}

export const quoteActions = {
    requestFreightQuote,
    backRequestFreightQuote,
    onNewFreightQuote,
    onCancelFreightQuote,
    onReviewFreightQuote,
};

export default quoteActions;