import { REGISTER, LOGIN, USER_LOADED, REGISTER_FAIL, LOGIN_FAIL, LOGOUT } from "./types";
import axios from "axios";
import setAuthHeader from "../../src/utils/setAuthHeader";


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
        console.log(err.response.data);
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
    } catch (err) {
        console.log(err.response.data.error);


        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.error
        })
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
    } catch (err) {
        console.log(err.response.data.error);

        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.error
        })
    }







};




export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}