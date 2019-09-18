import { reportConstants } from '../constants';

const initialState = {
    requested: false,
    succed: false,
    failed: false,
    report: null,
};

export function reports(state = initialState, action) {
    switch(action.type) {
    case reportConstants.REQUEST_NEW_REPORT:
        return {
            ...state,
            requested: true,
            report: action.report,
        };
    case reportConstants.SUCCESS_NEW_REPORT:
        return {
            ...state,
            succed: true,
        };
    case reportConstants.FAILED_NEW_REPORT:
        return {
            ...state,
            failed: true,
        };
    default:
        return state;
    }
};

export default reports;