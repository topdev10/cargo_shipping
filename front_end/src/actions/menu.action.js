import { menuConstants } from '../constants';

function openHamburgerMenu() {
    return {
        type: menuConstants.ON_MENU_OPEN
    };
}

function closeHamburgerMenu() {
    return {
        type: menuConstants.ON_MENU_CLOSE
    };
}

export const menuActions = {
    openHamburgerMenu,
    closeHamburgerMenu,
};

export default menuActions;