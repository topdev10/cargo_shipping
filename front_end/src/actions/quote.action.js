import { quoteConstants } from '../constants';
import { alertActions } from './alert.actions';
// import { history } from '../helpers';
import BaseApi from '../api/baseApi';

function requestFreightQuote(e, quote, token, email) {
    function request(_data) {return { type: quoteConstants.REQUEST_FREIGHT_QUOTE, _data};};
    function success(_data) {return { type: quoteConstants.SUCCESS_FREIGHT_QUOTE, quote: _data};};
    function failure(error) {return { type: quoteConstants.FAILED_FREIGHT_QUOTE, error};};
    
    return dispatch => {
        dispatch(request(quote));

        BaseApi.requestNewQuote({quote, token, email}, (error, result) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error("Add New Report Failed!"));
            } else if(result){
                dispatch(alertActions.success("Add New Report Success!"));
                dispatch(success(result));
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

function onViewFreightQuote(quote) {
    return {
        type: quoteConstants.ON_VIEW_QUOTE, quote
    };
}

function onEditFreightQuote(quote) {
    return {
        type: quoteConstants.ON_EDIT_QUOTE, quote
    };
}

function onUpdateFreightQuote(email, quote, token) {
    function request() {return { type: quoteConstants.ON_UPDATE_QUOTE_REQUEST};};
    function success(_quote) {return { type: quoteConstants.ON_UPDATE_QUOTE_SUCCESS, quote: _quote};};
    function failure(error) {return { type: quoteConstants.ON_UPDATE_QUOTE_FAILED, error};};
    
    return dispatch => {
        dispatch(request());

        BaseApi.updateQuote({email, token, quote}, (error, result) => {
            if(error){
                dispatch(failure("Quote Update Failed"));
                dispatch(alertActions.error("Quote Update Failed!"));
            } else if(result){
                dispatch(alertActions.success("Update Report Success!"));
                dispatch(success(quote));
            }
        });
    };
}

function onRemoveFreightQuote(email, quote, token) {
    function request() {return { type: quoteConstants.ON_REMOVE_QUOTE_REQUEST};};
    function success(_quote) {return { type: quoteConstants.ON_REMOVE_QUOTE_SUCCESS, quote: _quote};};
    function failure(error) {return { type: quoteConstants.ON_REMOVE_QUOTE_FAILED, error};};
    
    return dispatch => {
        dispatch(request());

        BaseApi.removeQuote({email, token, quote}, (error, result) => {
            if(error){
                dispatch(failure("Quote Remove Failed"));
                dispatch(alertActions.error("Quote Remove Failed!"));
            } else if(result){
                dispatch(alertActions.success("Remove Report Success!"));
                dispatch(success(quote));
            }
        });
    };
}

export const quoteActions = {
    requestFreightQuote,
    backRequestFreightQuote,
    onNewFreightQuote,
    onCancelFreightQuote,
    onReviewFreightQuote,
    onViewFreightQuote,
    onEditFreightQuote,
    onUpdateFreightQuote,
    onRemoveFreightQuote
};

export default quoteActions;