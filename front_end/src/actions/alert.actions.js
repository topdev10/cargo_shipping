import { alertConstants } from '../constants';

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function notification(message) {
    return { type: alertConstants.NOTIFICATION, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

export const alertActions = {
    success,
    error,
    notification,
    clear
};

export default alertActions;