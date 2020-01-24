import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

export const setAlert = (message, timeout = 4000) => dispatch => {
    const id = uuid.v4();

    dispatch({
        type: SET_ALERT,
        payload: { message, id }
    });

    setTimeout(
        () =>
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        }),
        timeout
    );
};