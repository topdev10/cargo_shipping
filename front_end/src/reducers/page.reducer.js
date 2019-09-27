import { pageConstants } from '../constants';

const initialState = { 
    userProfile: null,
    requestedProfile: false,
    receivedProfile: false,
    profileUpdateRequsted: false,
    profileUpdateSuccess: false,
    avatarUpdateRequested: false,
    avatarUpdateSuccess: false,
    avatarUpdateFailed: false,
    error: null,
    info: {
        shipments: null,
        quotes: null,
        billings: null,
        reports: null,
    },
    curPage: pageConstants.DASHBOARD,
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
            userProfile: action.mprofile
        };
    case pageConstants.UPDATE_PROFILE_FAILED:
        return {
            ...state,
            profileUpdateRequsted: false,
            profileUpdateSuccess: false,
        };
    case pageConstants.UPDATE_AVATAR_REQUEST:
        return {
            ...state,
            avatarUpdateRequested: true,
        };
    case pageConstants.UPDATE_AVATAR_FAILED:
        return {
            ...state,
            avatarUpdateFailed: true,
            avatarUpdateRequested: false,
        };
    case pageConstants.UPDATE_AVATAR_SUCCESS:
        return {
            ...state,
            avatarUpdateSuccess: true,
            avatarUpdateRequested: false,
            userProfile: {...state.userProfile, img: `uploads/${action.avatar.name}`}
        };
    case pageConstants.DASHBOARD:
        return {
            ...state,
            info: action.info
        };
    case pageConstants.QUOTES:
        return {
            ...state,
            info: action.info
        };
    case pageConstants.SHIPMENTS:
        return {
            ...state,
            info: action.info
        };
    case pageConstants.BILLING:
        return {
            ...state,
            info: action.info
        };
    case pageConstants.REPORTS:
        return {
            ...state,
            info: action.info
        };
    case pageConstants.ON_RELOAD_PAGE:
        return {
            ...state,
            curPage: action.curPage,
        };
    default:
        return state;
    }
}

export default pages;