import { ADD_REVIEW, GET_REVIEWS_FOR_ITEM, REMOVE_REVIEW } from "./types";
import axios from "axios";
import { setAlert } from "./alerts";

export const getItemReviews = itemId => async dispatch => {
    try {
        const res = await axios.get(`/api/v1/items/${itemId}/reviews`);

        dispatch({
            type: GET_REVIEWS_FOR_ITEM,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.error));
    }
};

export const addReview = (itemId, formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post(
            `/api/v1/items/${itemId}/reviews`,
            body,
            config
        );

        dispatch({
            type: ADD_REVIEW,
            payload: res.data.data
        });

        dispatch(setAlert("Review added"));
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

export const removeReview = reviewId => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.delete(`/api/v1/reviews/${reviewId}`, config);

        dispatch({
            type: REMOVE_REVIEW,
            payload: reviewId
        });

        dispatch(setAlert("Review removed"));
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