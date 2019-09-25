import { bookingConstants } from '../constants';

const initialState = {
    bookings: null,
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
            bookings: action.bookings
        };
    default:
        return {
            bookings: null,
        };
    }
}

export default booking;