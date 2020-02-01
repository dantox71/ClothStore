import {
    REGISTER,
    USER_LOADED,
    LOGIN,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR,
    AUTH_FAIL,
    EDIT_ACCOUNT_DATA
} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    loading: true,
    user: null,
    error: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
                user: payload
            };



        case REGISTER:
        case LOGIN:
            localStorage.setItem("token", payload);
            return {
                ...state,
                token: payload, //set token in state
                isAuthenticated: true,
                loading: false
            };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: payload
            };


        case EDIT_ACCOUNT_DATA:

            return {
                ...state,
                user: payload
            };


        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};