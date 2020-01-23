import { REGISTER, USER_LOADED } from "../actions/types";

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
            localStorage.setItem("token", payload);
            return {
                ...state,
                token: payload, //set token in state
                isAuthenticated: true,
                loading: false
            };

        default:
            return state;
    }
};