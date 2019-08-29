import { pageConstants } from '../constants';

export function pages(state = {}, action) {
    switch(action.type) {
    case pageConstants.PROFILE_PAGE:
        return {

        };
    default:
        return state;
    }
}

export default pages;