import { billConstants } from '../constants';
import { alertActions } from './alert.actions';
import BaseApi from '../api/baseApi';

function onPaymentRequest(data) {
    function success(record) { return { type: billConstants.ON_PAYMENT_SUCCESS, record }; }

    return dispatch => {
        BaseApi.requestPayment(data, (error, result) => {
            if(result.data.ship_id) {
                dispatch(success(result.data.ship_id));
                dispatch(alertActions.success("Payment Success!"));
            } else {
                dispatch(alertActions.error(result.data.error));
            }
        });
    };
}

function onPaymentSuccess(data) {
    return {
        type: billConstants.ON_PAYMENT_SUCCESS,
        quote: data
    };
}

function onClickModal() {
    return {
        type: billConstants.ON_MODAL_OPEN,
    };
}

function onMissModal() {
    return {
        type: billConstants.ON_MODAL_CLOSE,
    };
}

export const billActions = {
    onPaymentRequest,
    onPaymentSuccess,
    onClickModal,
    onMissModal,
};

export default billActions;
