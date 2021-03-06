import {
    REGISTER,
    LOGIN,
    USER_LOADED,
    REGISTER_FAIL,
    AUTH_FAIL,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR,
    CLEAR_ITEMS,
    CLEAR_ITEM
} from "./types";
import axios from "axios";
import setAuthHeader from "../../src/utils/setAuthHeader";
import { setAlert } from "../actions/alerts";
import store from "../store";
import { clearCart } from "./cart";

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthHeader(localStorage.token);
    }

    try {
        const res = await axios.get("/api/v1/auth/me");

        dispatch({
            type: USER_LOADED,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_FAIL,
            payload: err.response.data.error
        });
    }
};

export const register = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post("/api/v1/auth/register", body, config);

        dispatch({
            type: REGISTER,
            payload: res.data.token
        });

        dispatch(loadUser());
        store.dispatch(setAlert("Account Registered"));
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.error
        });
    }
};

export const login = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post("/api/v1/auth/login", body, config);

        dispatch({
            type: LOGIN,
            payload: res.data.token
        });

        dispatch(loadUser());
        store.dispatch(setAlert("Logged In"));
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.error
        });
    }
};

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    });
};

export const logout = () => dispatch => {
    //Clear user cart
    dispatch(clearCart());

    dispatch({
        type: LOGOUT
    });

    //Clear Items state
    dispatch({
        type: CLEAR_ITEMS
    });
    dispatch({
        type: CLEAR_ITEM
    });

    store.dispatch(setAlert("Logged Out"));
};