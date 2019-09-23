import update from 'react-addons-update';
import { billConstants } from '../constants';

const initialState = {
    billings: null,
    modal_status: false,
};

export function bills(state = initialState, action) {
    let selIndex = -1;
    switch(action.type) {
    case billConstants.ON_PAYMENT_SUCCESS:
        state.billings.forEach((item, index) => {
            if(item.shipID === action.record) {
                selIndex = index;
            }
        });
        if(selIndex === -1)
            return state;
        return update( state,{
            modal_status: {$set: false},
            billings: {
                [selIndex]: {
                    status: {$set: 1}
                }
            }
        });
    case billConstants.BILLING:
        return {
            ...state,
            billings: action.billings,
        };
    case billConstants.ON_MODAL_OPEN:
        return {
            ...state,
            modal_status: true
        };
    case billConstants.ON_MODAL_CLOSE:
        return {
            ...state,
            modal_status: false
        };
    default:
        return state;
    }
}

export default bills;