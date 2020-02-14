import { quoteConstants } from '../constants';

const initialState = {
    requested: false,
    succeed: false,
    failed: false,
    onpagestatus: 0,
    newquote: null,
    quotes: null,
    quotePageState: "loading",
    onview: false,
    onedit: false,
};

export function quotes(state = initialState, action) {
    switch(action.type) {
    case quoteConstants.ON_REQUEST_ALL_QUOTES:
        return {
            ...state,
            quotePageState: "loading",
        };
    
    case quoteConstants.ON_RECEIVE_ALL_QUOTES:
        return {
            ...state,
            quotePageState: "finished",
            quotes: action.quotes
        };
    case quoteConstants.REQUEST_FREIGHT_QUOTE:
        return {
            ...state,
            requested: true,
            succeed: false,
            failed: false,
            onpagestatus: 2,
        };
    case quoteConstants.SUCCESS_FREIGHT_QUOTE:
        return {
            ...state,
            succeed: true,
            failed: false,
            onpagestatus: 0,
            quotes: [ ...state.quotes, action.quote]
        };
    case quoteConstants.FAILED_FREIGHT_QUOTE:
        return {
            ...state,
            requested: true,
            succeed: false,
            failed: true,
            onpagestatus: 1,
        };
    case quoteConstants.ON_NEW_FREIGHT_QUOTE:
        return {
            ...state,
            onpagestatus: 1,
        };
    case quoteConstants.BACK_REQUEST_QUOTE:
        return {
            ...state,
            onpagestatus: 0,
            onview: false,
        };
    case quoteConstants.ON_CANCEL_FREIGHT_QUOTE:
        return {
            ...state,
            onpagestatus: 0,
            onedit: false,
        };
    case quoteConstants.ON_REVIEW_FREIGHT_QUOTE:
        return {
            ...state,
            onpagestatus: 2,
            newquote: action.quote
        };
    case quoteConstants.ON_VIEW_QUOTE:
        return {
            ...state,
            onpagestatus: 2,
            newquote: action.quote,
            onview: true,
        };
    case quoteConstants.ON_EDIT_QUOTE:
        return {
            ...state,
            onpagestatus: 1,
            onedit: true,
            newquote: action.quote
        };
    case quoteConstants.ON_UPDATE_QUOTE_REQUEST:
        return {
            ...state,
            quotePageState: "loading",
        };
    case quoteConstants.ON_UPDATE_QUOTE_SUCCESS:
        return {
            ...state,
            quotePageState: "finished",
            onedit: false,
            onpagestatus: 0,
            // TODO: update quotes array with updated id -action.id
            quotes: state.quotes.map(item => (item.id === action.quote.id)?action.quote:item),
        };
    case quoteConstants.ON_UPDATE_QUOTE_FAILED:
        return {
            ...state,
            quotePageState: "finished",
        };
    case quoteConstants.ON_REMOVE_QUOTE_REQUEST:
        return {
            ...state,
            quotePageState: "loading",
        };
    case quoteConstants.ON_REMOVE_QUOTE_SUCCESS:
        return {
            ...state,
            quotePageState: "finished",
            // TODO: Remove a quote from quotes array with quote id
            quotes: state.quotes.filter(item => item.id !== action.quote.id),
        };
    case quoteConstants.ON_REMOVE_QUOTE_FAILED:
        return {
            ...state,
            quotePageState: "finished",
        };
    default:
        return state;
    }
}

export default quotes;