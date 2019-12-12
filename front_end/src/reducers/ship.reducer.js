import { shipsConstants } from '../constants';

const initialState = {
    shipments: null,
    shipment: null, // individual shipment for details
    pageStatus: 1,  // 0: loading, 1: view all, 2: view details
};

export function shipments(state = initialState, action) {
    switch (action.type) {
    case shipsConstants.ON_SHIPMENTS:
        return {
            ...state,
            shipments: action.shipments,
            pageStatus: 1,
        };
    case shipsConstants.ON_VIEWDETAILS:
        return {
            ...state,
            pageStatus: 2,
            shipment: action.shipment,
        };
    case shipsConstants.ON_VIEWALL:
        return {
            ...state,
            pageStatus: 1,
        }
    default:
        return state;
    }
}

export default shipments;