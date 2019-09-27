import { pageConstants, billConstants, bookingConstants, shipsConstants } from '../constants';
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
                dispatch(alertActions.error("Get Profile Failed"));
            } else if(profile===""){
                dispatch(success(null));
            } else dispatch(success(profile));
        });
    };
}

function updateProfile(profile) {

    function request(mprofile) { return { type: pageConstants.UPDATE_PROFILE_REQUEST, mprofile }; }
    function success(mprofile) { return { type: pageConstants.UPDATE_PROFILE_SUCCESS, mprofile }; }
    function failure(error) { return { type: pageConstants.UPDATE_PROFILE_FAILED, error }; }

    return dispatch => {
        dispatch(request(profile));
        BaseApi.updateProfile(profile, (error) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error("Update Profile Failed"));
            } else {
                dispatch(success(profile));
                dispatch(alertActions.success("Update Profile Success!"));
            }
        });
    };
}

function updateAvatar(data) {
    function request(avatar) { return { type: pageConstants.UPDATE_AVATAR_REQUEST, avatar }; }
    function success(avatar) { return { type: pageConstants.UPDATE_AVATAR_SUCCESS, avatar }; }
    function failure(error) { return { type: pageConstants.UPDATE_AVATAR_FAILED, error }; }

    return dispatch => {
        dispatch(request(data));
        BaseApi.updateAvatar(data, (error, result) => {
            if(error){
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            } else if(result) {
                dispatch(success(data.avatar));
                dispatch(alertActions.success("Update Avatar Success!"));
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

    function requestShipments(shipments) {
        return {
            type: shipsConstants.ON_SHIPMENTS, shipments
        };
    }

    function requestBilling(billings) {
        return {
            type: billConstants.BILLING, billings
        };
    }

    function requestBooking(bookings) {
        return {
            type: bookingConstants.ON_REQUEST_ALL_BOOKINGS, bookings
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
                    plane_id: "S15332",
                    user_id: "PO# 1245/P86-32",
                    load_spec: "10*0.06cbm Test at 30kg", 
                },
                {
                    id: "FLEX-48740",
                    venderID: "VND-44097-11111",
                    location: "Arrival Port",
                    route: 2,
                    progress: 70,
                    commit: "Planned transit changed",
                    state: 3,
                    plane_id: "S15421",
                    user_id: "PO# 1345/P86-37",
                    load_spec: "20*36cbm Test at 20kg", 
                },
                {
                    id: "FLEX-46986",
                    venderID: "VND-33006-22079",
                    location: "Arrival Port",
                    route: 1,
                    progress: 70,
                    commit: "Booking Approved",
                    state: 2,
                    plane_id: "S25342",
                    user_id: "PO# 1324/P86-31",
                    load_spec: "11*16cbm Test at 10kg", 
                },
                {
                    id: "FLEX-50008",
                    venderID: "VND-06021-98662",
                    location: "Seller's Location",
                    route: 2,
                    progress: 30,
                    commit: "Document Uploaded",
                    state: 3,
                    plane_id: "S23242",
                    user_id: "PO# 1135/P82-37",
                    load_spec: "50*0.26cbm Test at 110kg", 
                },
                {
                    id: "FLEX-49998",
                    venderID: "VND-86612-44444",
                    location: "In Transit to Arrival Port",
                    route: 3,
                    progress: 50,
                    commit: "Document Uploaded",
                    state: 1,
                    plane_id: "S22532",
                    user_id: "PO# 1345/P86-37",
                    load_spec: "20*0.11cbm Test at 12kg", 
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
                    submittedBy: "Jinlong Yin",
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
                    submittedBy: "Yin Jinlong",
                    status: 2,
                },
                {
                    id: "FLEX-68580",
                    venderID: "VND-28488-23342",
                    reviewCnt: 2,
                    newCnt: 1,
                    name: "Shenzen",
                    freight: 2,
                    cargoReadyDate: 0,
                    from: "NewYork, United States",
                    to: "Vacouver, Canada",
                    cargoDetails: "N/A",
                    submittedBy: "Bill Camarda",
                    status: 4,
                },
                {
                    id: "FLEX-62387",
                    venderID: "VND-58453-25623",
                    reviewCnt: 3,
                    newCnt: 2,
                    name: "Shenyang",
                    freight: 1,
                    cargoReadyDate: 0,
                    from: "Vacouver, Canada",
                    to: "Tokyo, Japan",
                    cargoDetails: "N/A",
                    submittedBy: "Rao Smit",
                    status: 2,
                },
                {
                    id: "FLEX-68999",
                    venderID: "VND-28488-45232",
                    reviewCnt: 2,
                    newCnt: 1,
                    name: "Shenzen",
                    freight: 2,
                    cargoReadyDate: 0,
                    from: "NewYork, United States",
                    to: "Vacouver, Canada",
                    cargoDetails: "N/A",
                    submittedBy: "Bill Camarda",
                    status: 4,
                },
                {
                    id: "FLEX-67678",
                    venderID: "VND-58453-88990",
                    reviewCnt: 3,
                    newCnt: 2,
                    name: "Shenyang",
                    freight: 1,
                    cargoReadyDate: 0,
                    from: "Vacouver, Canada",
                    to: "Tokyo, Japan",
                    cargoDetails: "N/A",
                    submittedBy: "Rao Smit",
                    status: 2,
                }
            ],
            bookings: [
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
                    submittedBy: "Jinlong Yin",
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
                    submittedBy: "Yin Jinlong",
                    status: 2,
                },
                {
                    id: "FLEX-68580",
                    venderID: "VND-28488-23342",
                    reviewCnt: 2,
                    newCnt: 1,
                    name: "Shenzen",
                    freight: 2,
                    cargoReadyDate: 0,
                    from: "NewYork, United States",
                    to: "Vacouver, Canada",
                    cargoDetails: "N/A",
                    submittedBy: "Bill Camarda",
                    status: 4,
                },
                {
                    id: "FLEX-62387",
                    venderID: "VND-58453-25623",
                    reviewCnt: 3,
                    newCnt: 2,
                    name: "Shenyang",
                    freight: 1,
                    cargoReadyDate: 0,
                    from: "Vacouver, Canada",
                    to: "Tokyo, Japan",
                    cargoDetails: "N/A",
                    submittedBy: "Rao Smit",
                    status: 2,
                },
                {
                    id: "FLEX-68999",
                    venderID: "VND-28488-45232",
                    reviewCnt: 2,
                    newCnt: 1,
                    name: "Shenzen",
                    freight: 2,
                    cargoReadyDate: 0,
                    from: "NewYork, United States",
                    to: "Vacouver, Canada",
                    cargoDetails: "N/A",
                    submittedBy: "Bill Camarda",
                    status: 4,
                },
                {
                    id: "FLEX-67678",
                    venderID: "VND-58453-88990",
                    reviewCnt: 3,
                    newCnt: 2,
                    name: "Shenyang",
                    freight: 1,
                    cargoReadyDate: 0,
                    from: "Vacouver, Canada",
                    to: "Tokyo, Japan",
                    cargoDetails: "N/A",
                    submittedBy: "Rao Smit",
                    status: 2,
                }
            ],
            billings: [
                {
                    shipID: "FLEX-68880",
                    id: "FLEX-68880-2",
                    date: "2019-08-31",
                    balance: "$13,063.43",
                    status: 0
                },
                {
                    shipID: "FLEX-31845",
                    id: "FLEX-31845-3",
                    date: "2019-09-01",
                    balance: "$11,136.67",
                    status: 0
                },
                {
                    shipID: "FLEX-31225",
                    id: "FLEX-31225-1",
                    date: "2019-09-21",
                    balance: "$2,436.72",
                    status: 0
                }
            ],
            reports: [
                {
                    id: "FLEX-68887",
                    venderID: "VND-58453-22123",
                    createdat: "2019-8-14 12:12:12",
                    containerType: 1,
                    sealNumber: "123456",
                    grossWeight: 25,
                    cargoDetails: "N/A",
                    shipmentId: "SI-CC3920",
                    shipmentStatus: 1,
                    customerReference: "reference",
                    additionalInformation: "N/A",
                    transportMode: 1,
                    transportType: 2,
                    bookingDate: "2019-8-14",
                    incoterm: "Incoterm",
                    pickupCompanyName: "Chazle",
                    delieveryCompanyName: "Freight Genius",
                    shipperCompanyName: "Freight Genius",
                    state: 1,
                },
                {
                    id: "FLEX-53453",
                    venderID: "VND-22356-78767",
                    createdat: "2019-8-11 11:11:11",
                    containerType: 2,
                    sealNumber: "123566",
                    grossWeight: 22,
                    cargoDetails: "N/A",
                    shipmentId: "SI-CC3933",
                    shipmentStatus: 1,
                    customerReference: "reference",
                    additionalInformation: "N/A",
                    transportMode: 2,
                    transportType: 1,
                    bookingDate: "2019-8-11",
                    incoterm: "Incoterm",
                    pickupCompanyName: "Chazle",
                    delieveryCompanyName: "Freight Genius",
                    shipperCompanyName: "Freight Genius",
                    state: 2,
                },
                {
                    id: "FLEX-25863",
                    venderID: "VND-36985-25874",
                    createdat: "2019-8-11 11:11:11",
                    containerType: 2,
                    sealNumber: "123569",
                    grossWeight: 22,
                    cargoDetails: "N/A",
                    shipmentId: "SI-CC3854",
                    shipmentStatus: 1,
                    customerReference: "reference",
                    additionalInformation: "N/A",
                    transportMode: 2,
                    transportType: 1,
                    bookingDate: "2019-7-11",
                    incoterm: "Incoterm",
                    pickupCompanyName: "Chazle",
                    delieveryCompanyName: "Freight Genius",
                    shipperCompanyName: "Freight Genius",
                    state: 2,
                },
                {
                    id: "FLEX-65484",
                    venderID: "VND-99548-22154",
                    createdat: "2019-8-11 11:11:11",
                    containerType: 3,
                    sealNumber: "123566",
                    grossWeight: 22,
                    cargoDetails: "N/A",
                    shipmentId: "SI-CC3223",
                    shipmentStatus: 1,
                    customerReference: "reference",
                    additionalInformation: "N/A",
                    transportMode: 2,
                    transportType: 1,
                    bookingDate: "2019-8-11",
                    incoterm: "Incoterm",
                    pickupCompanyName: "Chazle",
                    delieveryCompanyName: "Freight Genius",
                    shipperCompanyName: "Freight Genius",
                    state: 2,
                },
                {
                    id: "FLEX-221548",
                    venderID: "VND-951478-35951",
                    createdat: "2019-8-11 11:11:11",
                    containerType: 3,
                    sealNumber: "123568",
                    grossWeight: 22,
                    cargoDetails: "N/A",
                    shipmentId: "SI-CC556",
                    shipmentStatus: 1,
                    customerReference: "reference",
                    additionalInformation: "N/A",
                    transportMode: 2,
                    transportType: 1,
                    bookingDate: "2019-8-02",
                    incoterm: "Incoterm",
                    pickupCompanyName: "Chazle",
                    delieveryCompanyName: "Freight Genius",
                    shipperCompanyName: "Freight Genius",
                    state: 2,
                },
                {
                    id: "FLEX-255858",
                    venderID: "VND-12456-78541",
                    createdat: "2019-8-11 11:11:11",
                    containerType: 1,
                    sealNumber: "55462",
                    grossWeight: 22,
                    cargoDetails: "N/A",
                    shipmentId: "SI-CC55547",
                    shipmentStatus: 1,
                    customerReference: "reference",
                    additionalInformation: "N/A",
                    transportMode: 2,
                    transportType: 1,
                    bookingDate: "2019-8-08",
                    incoterm: "Incoterm",
                    pickupCompanyName: "Chazle",
                    delieveryCompanyName: "Freight Genius",
                    shipperCompanyName: "Freight Genius",
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
        if(page === shipsConstants.ON_SHIPMENTS){
            dispatch(requestShipments(info.shipments));
            history.push('/pages/shipments');
        }
        if(page === billConstants.BILLING){
            dispatch(requestBilling(info.billings));
            history.push('/pages/billing');
        }
        if(page === bookingConstants.ON_REQUEST_ALL_BOOKINGS) {
            dispatch(requestBooking(info.bookings));
            history.push('/pages/booking');
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
    updateAvatar,
    loadPage,
};

export default pageActions;