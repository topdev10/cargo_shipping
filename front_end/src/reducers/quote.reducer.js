import { quoteConstants } from '../constants';

const initialState = {
    requested: false,
    succeed: false,
    failed: false,
    onrequestpage: false,
};

export function quotes(state = initialState, action) {
    switch(action.type) {
    case quoteConstants.REQUEST_FREIGHT_QUOTE:
        return {
            ...state,
            requested: true,
            succeed: false,
            failed: false,
            onrequestpage: true,
        };
    case quoteConstants.SUCCESS_FREIGHT_QUOTE:
        return {
            ...state,
            succeed: true,
            failed: false,
            onrequestpage: false,
        };
    case quoteConstants.FAILED_FREIGHT_QUOTE:
        return {
            ...state,
            requested: true,
            succeed: false,
            failed: true,
            onrequestpage: true,
        };
    case quoteConstants.ON_NEW_FREIGHT_QUOTE:
        return {
            ...state,
            onrequestpage: true,
        };
    default:
        return state;
    }
}

export default quotes;