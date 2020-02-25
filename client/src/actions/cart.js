import {
    GET_CART_ITEMS,
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART
} from "./types";
import axios from "axios";
import { setAlert } from "./alerts";
import { loadUser } from './auth';



export const getCartItems = () => async dispatch => {
    try {
        const res = await axios.get("/api/v1/cart/");

        dispatch({
            type: GET_CART_ITEMS,
            payload: res.data.data
        });
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));
    }
};

export const addItemToCart = itemId => async dispatch => {
    try {
        const res = await axios.post(`/api/v1/cart/${itemId}`);

        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: res.data.data
        });

        dispatch(setAlert("Item added to cart"));
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));
    }
};

export const removeItemFromCart = itemId => async dispatch => {
    try {
        await axios.delete(`/api/v1/cart/${itemId}`);

        dispatch({
            type: REMOVE_ITEM_FROM_CART,
            payload: itemId
        });

        dispatch(setAlert("Item removed from cart"));
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

export const clearCart = () => async dispatch => {
    try {
        await axios.delete("/api/v1/cart/clear");

        dispatch({
            type: CLEAR_CART
        });
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));
    }
};

export const buyItemsInCart = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        await axios.post("/api/v1/cart/buy", config);

        //Load new user data (amount of money changed)
        dispatch(loadUser());

        //Clear cart
        dispatch({
            type: CLEAR_CART
        });

        dispatch(setAlert("Items from cart have been bought"));
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));
    }
};