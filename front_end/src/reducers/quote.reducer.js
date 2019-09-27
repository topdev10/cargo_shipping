import { quoteConstants } from '../constants';

const initialState = {
    requested: false,
    succeed: false,
    failed: false,
    onpagestatus: 0,
    newquote: null,
    quotes: null,
    quotePageState: "loading",
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
            onpagestatus: 2,
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
            onpagestatus: 0
        };
    case quoteConstants.ON_CANCEL_FREIGHT_QUOTE:
        return {
            ...state,
            onpagestatus: 0,
        };
    case quoteConstants.ON_REVIEW_FREIGHT_QUOTE:
        return {
            ...state,
            onpagestatus: 2,
            newquote: action.quote
        };
    default:
        return state;
    }
}

export default quotes;