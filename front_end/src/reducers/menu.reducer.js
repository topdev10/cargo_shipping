import { menuConstants } from '../constants';

const initialState = {
    menuState: menuConstants.MENU_CLOSE
};

export function menu(state = initialState, action) {
    switch(action.type) {
    case menuConstants.ON_MENU_OPEN:
        return {
            ...state,
            menuState: menuConstants.MENU_OPEN,
        };
    case menuConstants.ON_MENU_CLOSE:
        return {
            ...state,
            menuState: menuConstants.MENU_CLOSE,
        };
    default:
        return {
            menuState: menuConstants.MENU_CLOSE,
        };
    }
}

export default menu;