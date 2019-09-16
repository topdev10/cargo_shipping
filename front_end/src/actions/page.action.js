import { pageConstants } from '../constants';
import { alertActions } from './alert.actions';
import { history } from '../helpers';
import BaseApi from '../api/baseApi';

function getProfile(username, email) {

    function request(_username) { return { type: pageConstants.REQUEST_PROFILE, _username }; }
    function success(profile) { return { type: pageConstants.SUCCESS_PROFILE, profile }; }
    function failure(error) { return { type: pageConstants.FAILED_PROFILE, error }; }

    return dispatch => {
        history.push('/profile');
        dispatch(request({ username }));
        BaseApi.getProfile({ username, email }, (error, profile) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            } else if(profile===""){
                dispatch(success(null));
            } else dispatch(success(profile));
        });
    };
}

function updateProfile(profile) {

    function request(_profile) { return { type: pageConstants.UPDATE_PROFILE_REQUEST, _profile }; }
    function success(_profile) { return { type: pageConstants.UPDATE_PROFILE_SUCCESS, _profile }; }
    function failure(error) { return { type: pageConstants.UPDATE_PROFILE_FAILED, error }; }

    return dispatch => {
        dispatch(request(profile));
        BaseApi.updateProfile(profile, (error) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            } else {
                dispatch(success({profile}));
            }
        });
    };
}

function loadPage(page) {

    function requestDashboard(info) {
        return {
            type: pageConstants.DASHBOARD, info
        };
    }

    function requestQuotes(info) {
        return {
            type: pageConstants.QUOTES, info
        };
    }

    function requestShipments(info) {
        return {
            type: pageConstants.SHIPMENTS, info
        };
    }

    function requestBilling(info) {
        return {
            type: pageConstants.BILLING, info
        };
    }
    
    function requestReports(info) {
        return {
            type: pageConstants.REPORTS, info
        };
    }

    return dispatch => {

        const info = {
            shipments: [
                {
                    id: "FLEX-51782",
                    venderID: "VND-0923-1938",
                    location: "Seller's Location",
                    route: 1,
                    progress: 30,
                    commit: "Planned transit changed",
                    state: 1,
                },
                {
                    id: "FLEX-48740",
                    venderID: "VND-44097-11111",
                    location: "Arrival Port",
                    route: 2,
                    progress: 70,
                    commit: "Planned transit changed",
                    state: 1,
                },
                {
                    id: "FLEX-46986",
                    venderID: "VND-33006-22079",
                    location: "Arrival Port",
                    route: 1,
                    progress: 70,
                    commit: "Booking Approved",
                    state: 2,
                },
                {
                    id: "FLEX-50008",
                    venderID: "VND-06021-98662",
                    location: "Seller's Location",
                    route: 2,
                    progress: 30,
                    commit: "Document Uploaded",
                    state: 3,
                },
                {
                    id: "FLEX-49998",
                    venderID: "VND-86612-44444",
                    location: "In Transit to Arrival Port",
                    route: 3,
                    progress: 50,
                    commit: "Document Uploaded",
                    state: 3,
                }
            ],
            quotes: [
                {
                    id: "FLEX-68880",
                    venderID: "VND-28453-28123",
                    reviewCnt: 2,
                    newCnt: 1,
                    name: "Shenzen",
                    freight: 2,
                    cargoReadyDate: 0,
                    from: "Yantian, China",
                    to: "Vacouver, Canada",
                    cargoDetails: "N/A",
                    submittedBy: "Bill Camarda",
                    status: 4,
                },
                {
                    id: "FLEX-68887",
                    venderID: "VND-58453-22123",
                    reviewCnt: 3,
                    newCnt: 2,
                    name: "Shenyang",
                    freight: 1,
                    cargoReadyDate: 0,
                    from: "Liaoning, China",
                    to: "Vacouver, Canada",
                    cargoDetails: "N/A",
                    submittedBy: "Bill Camarda",
                    status: 2,
                }
            ],
            billings: [
                {
                    id: "FLEX-68880",
                    venderID: "VND-58453-22123",
                    state: 1,
                    date: "2019-08-31",
                },
                {
                    id: "FLEX-31845",
                    venderID: "VND-74253-73122",
                    state: 1,
                    date: "2019-09-01",
                }
            ],
            reports: [
                {
                    id: "FLEX-68887",
                    venderID: "VND-58453-22123",
                    state: 1,
                },
                {
                    id: "FLEX-44887",
                    venderID: "VND-23453-27823",
                    state: 2,
                }
            ]
        };

        if(page === pageConstants.DASHBOARD){
            dispatch(requestDashboard(info));
            history.push('/pages/dashboard');
        }
        if(page === pageConstants.QUOTES){
            dispatch(requestQuotes(info));
            history.push('/pages/quotes');
        }
        if(page === pageConstants.SHIPMENTS){
            dispatch(requestShipments(info));
            history.push('/pages/shipments');
        }
        if(page === pageConstants.BILLING){
            dispatch(requestBilling(info));
            history.push('/pages/billing');
        }
        if(page === pageConstants.REPORTS){
            dispatch(requestReports(info));
            history.push('/pages/reports');
        }
    };
}

export const pageActions = {
    getProfile,
    updateProfile,
    loadPage,
};

export default pageActions;