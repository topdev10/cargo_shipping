import { alertConstants } from '../constants';

export function alert(state = null, action) {
    switch (action.type) {
    case alertConstants.SUCCESS:
        return {
            type: alertConstants.SUCCESS,
            message: action.message
        };
    case alertConstants.ERROR:
        return {
            type: alertConstants.ERROR,
            message: action.message
        };
    case alertConstants.NOTIFICATION:
        return {
            type: alertConstants.NOTIFICATION,
            message: action.message
        };
    case alertConstants.CLEAR:
        return null;
    default:
        return state;
    }
}

export default alert;