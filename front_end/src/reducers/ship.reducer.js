import { shipsConstants } from '../constants';

const initialState = {
    shipments: null,
};

export function shipments(state = initialState, action) {
    switch (action.type) {
    case shipsConstants.ON_SHIPMENTS:
        return {
            ...state,
            shipments: action.shipments
        };
    default:
        return state;
    }
}

export default shipments;