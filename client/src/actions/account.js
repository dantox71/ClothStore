import {
    UPLOAD_USER_PHOTO,
    EDIT_ACCOUNT_FAIL,
    CLEAR_ERROR,
    EDIT_ACCOUNT_DATA,
    LOGOUT,
    CLEAR_ITEMS,
    CLEAR_ITEM
} from "./types";
import axios from "axios";
import { setAlert } from "./alerts";
import store from "../store";

export const editAccountData = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.put("/api/v1/auth/me/data", body, config);

        dispatch({
            type: EDIT_ACCOUNT_DATA,
            payload: res.data.data
        });

        store.dispatch(setAlert("Changed"));
    } catch (err) {
        dispatch({
            type: EDIT_ACCOUNT_FAIL,
            payload: err.response.data.error
        });
    }
};

export const editAccountPassword = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(formData);

    try {
        await axios.put("/api/v1/auth/me/password", body, config);

        store.dispatch(setAlert("Changed"));
    } catch (err) {
        dispatch({
            type: EDIT_ACCOUNT_FAIL,
            payload: err.response.data.error
        });
    }
};

export const uploadUserPhoto = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    try {
        const res = await axios.put("/api/v1/auth/me/photo", formData, config);

        dispatch({
            type: UPLOAD_USER_PHOTO,
            payload: res.data.data
        });

        dispatch(setAlert("Photo Uploaded"));
    } catch (err) {
        const error = err.response.data.error;

        if (error.indexOf(",") > -1) {
            const errors = error.split(",");

            errors.forEach(error => {
                dispatch(setAlert(error));
            });
        } else {
            dispatch(setAlert(error));
        }
    }
};

export const deleteAccount = () => async dispatch => {
    try {
        //Remove account
        await axios.delete("api/v1/auth/delete");

        //Log out when account is deleted
        store.dispatch({
            type: LOGOUT
        });

        //Clear Items state
        dispatch({
            type: CLEAR_ITEMS
        });
        dispatch({
            type: CLEAR_ITEM
        });

        store.dispatch(setAlert("Account has been deleted"));
    } catch (err) {
        store.dispatch(setAlert(err.response.data.error));
    }
};

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    });
};