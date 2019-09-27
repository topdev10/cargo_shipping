import { shipsConstants } from '../constants';

function onShipsLoad(data) {
    return {
        type: shipsConstants.ON_SHIPMENTS,
        shipments: data
    };
}

export const shipActions = {
    onShipsLoad,
};

export default shipActions;
