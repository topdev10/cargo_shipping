import { shipsConstants } from '../constants';

function onShipsLoad(data) {
    return {
        type: shipsConstants.ON_SHIPMENTS,
        shipments: data
    };
}

function onViewDetails(data) {
    console.log(data);
    return {
        type: shipsConstants.ON_VIEWDETAILS,
        shipment: data
    };
}

function onBackToMain() {
    return {
        type: shipsConstants.ON_VIEWALL,
    };
}

export const shipActions = {
    onShipsLoad,
    onViewDetails,
    onBackToMain
};

export default shipActions;
