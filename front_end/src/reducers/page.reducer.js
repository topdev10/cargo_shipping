import { pageConstants } from '../constants';

const initialState = { 
    userProfile: null,
    requestedProfile: false,
    receivedProfile: false,
    profileUpdateRequsted: false,
    profileUpdateSuccess: false,
    error: null,
    info: {
        shipments: null,
        quotes: null,
        billings: null,
        reports: null,
    },
    // ect
};

export function pages(state = initialState, action) {
    switch(action.type) {
    case pageConstants.REQUEST_PROFILE:
        return {
            ...state,
            requestedProfile: true,
            receivedProfile: false,
        };
    case pageConstants.SUCCESS_PROFILE:
        return {
            ...state,
            userProfile: action.profile,
            requestedProfile: false,
            receivedProfile: true,
        };
    case pageConstants.FAILED_PROFILE:
        return {
            ...state,
            userProfile: null,
            requestedProfile: false,
            receivedProfile: false,
            error: action.error,
        };
    case pageConstants.UPDATE_PROFILE_REQUEST:
        return {
            ...state,
            profileUpdateRequsted: true,
        };
    case pageConstants.UPDATE_PROFILE_SUCCESS:
        return {
            ...state,
            profileUpdateRequsted: false,
            profileUpdateSuccess: true,
        };
    case pageConstants.UPDATE_PROFILE_FAILED:
        return {
            ...state,
            profileUpdateRequsted: false,
            profileUpdateSuccess: false,
            userProfile: null,
        };
    case pageConstants.DASHBOARD:
        return {
            ...state,
            info: action.info
        };
    default:
        return state;
    }
}

export default pages;