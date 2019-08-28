import { userConstants } from '../constants';

const initialState = { registering: false, registered: false, codeVerified: true };

export function registration(state = initialState, action) {
    switch (action.type) {
    case userConstants.REGISTER_REQUEST:
        return { registering: true };
    case userConstants.REGISTER_SUCCESS:
        return { registered: true, registering: false };
    case userConstants.REGISTER_FAILURE:
        return {};
    case userConstants.VERIFY_REQUEST:
        return { codeVerified: false };
    case userConstants.VERIFY_SUCCESS:
        return { codeVerified: true, registering: false, registered: false };
    case userConstants.VERIFY_FAILURE:
        return {};
    default:
        return state;
    }
}

export default registration;