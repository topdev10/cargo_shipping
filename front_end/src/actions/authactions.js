export const LOGIN = "login";
export const SIGNUP = "signup";

export const doLogin = () => (dispatch) => {
    return dispatch({});
};

export const doLogout = (type) => (dispatch) => {
    return dispatch({ type });
};

export const doSignup = (type) => (dispatch) => {
    return dispatch({ type });
};