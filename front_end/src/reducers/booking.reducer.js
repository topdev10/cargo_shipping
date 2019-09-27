import { bookingConstants } from '../constants';

const initialState = {
    bookings: null,
    bookingStatus: 'loading',
};

export function booking(state = initialState, action) {
    switch(action.type) {
    case bookingConstants.ON_NEW_BOOKING:
        return {
            ...state,
        };
    case bookingConstants.ON_EDIT_BOOKING:
        return {
            ...state,
        };
    case bookingConstants.ON_REQUEST_ALL_BOOKINGS:
        return {
            ...state,
            bookingStatus: 'loading',
        };
    case bookingConstants.ON_RECEIVE_ALL_BOOKINGS:
        return {
            ...state,
            bookingStatus: 'finished',
            bookings: action.bookings
        };
    default:
        return {
            bookings: null,
        };
    }
}

export default booking;