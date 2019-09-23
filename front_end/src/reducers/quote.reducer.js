import { quoteConstants } from '../constants';

const initialState = {
    requested: false,
    succeed: false,
    failed: false,
    onpagestatus: 0,
    newquote: null,
};

export function quotes(state = initialState, action) {
    switch(action.type) {
    case quoteConstants.REQUEST_FREIGHT_QUOTE:
        return {
            ...state,
            requested: true,
            succeed: false,
            failed: false,
            onpagestatus: 1,
        };
    case quoteConstants.SUCCESS_FREIGHT_QUOTE:
        return {
            ...state,
            succeed: true,
            failed: false,
            onpagestatus: 0,
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