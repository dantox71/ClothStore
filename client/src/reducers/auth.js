import {
    REGISTER,
    USER_LOADED,
    LOGIN,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGOUT
} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    loading: true,
    user: null,
    errors: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                errors: null,
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
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                errors: payload || null
            }

        default:
            return state;
    }
};