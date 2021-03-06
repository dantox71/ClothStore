import {
    ADD_ITEM,
    GET_USER_ITEMS,
    GET_SINGLE_ITEM,
    GET_ITEMS_ON_SELL,
    EDIT_ITEM,
    FILTER_ITEMS,
    SET_LOADING
} from "./types";
import axios from "axios";
import { setAlert } from "./alerts";

export const getUserItems = () => async dispatch => {
    try {
        const res = await axios.get("api/v1/items/me");

        dispatch({
            type: GET_USER_ITEMS,
            payload: res.data.data
        });
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));
    }
};

export const getItemsOnSell = () => async dispatch => {
    dispatch(setLoading());

    try {
        const res = await axios.get("/api/v1/items?onsell=true&incart=false");

        dispatch({
            type: GET_ITEMS_ON_SELL,
            payload: res.data.data
        });
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));
    }
};

export const filterItems = queryStr => async dispatch => {
    dispatch(setLoading());

    try {
        const res = await axios.get(
            `/api/v1/items?onsell=true&incart=false${queryStr}`
        );

        dispatch({
            type: FILTER_ITEMS,
            payload: res.data.data
        });
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));
    }
};

export const getSingleItem = itemId => async dispatch => {
    dispatch(setLoading());

    try {
        const res = await axios.get(`/api/v1/items/${itemId}`);

        dispatch({
            type: GET_SINGLE_ITEM,
            payload: res.data.data
        });
    } catch (err) {
        const error = err.response.data.error;

        //Check if there's more than one error and if so , show them all.
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

export const addItem = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post("/api/v1/items", body, config);

        dispatch({
            type: ADD_ITEM,
            payload: res.data.data
        });

        dispatch(setAlert("Item added"));
    } catch (err) {
        const error = err.response.data.error;

        //Check if there's more than one error and if so , show them all.
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

export const editItem = (itemId, formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = await JSON.stringify(formData);

    try {
        const res = await axios.put(`/api/v1/items/${itemId}`, body, config);

        dispatch({
            type: EDIT_ITEM,
            payload: { itemId, newItem: res.data.data }
        });

        //Check if user want to sell/return to magazine item (which mean that onsell property is changed)
        if (formData.onsell) {
            dispatch(setAlert("Item is available to be bought by others"));
        } else if (formData.onsell === false) {
            dispatch(setAlert("Item is no longer available to be bought"));
        }
        //If whole item is edited
        else {
            dispatch(setAlert("Item edited"));
        }
    } catch (err) {
        const error = err.response.data.error;

        //Check if there's more than one error and if so , show them all.
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

export const setLoading = () => dispatch => {
    dispatch({
        type: SET_LOADING
    });
};