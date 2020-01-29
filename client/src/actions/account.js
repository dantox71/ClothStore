import {
    UPLOAD_USER_PHOTO,
    EDIT_ACCOUNT_FAIL,
    CLEAR_ERROR,
    EDIT_ACCOUNT_DATA
} from './types';
import axios from 'axios';
import { setAlert } from './alerts';
import store from '../store';





export const editAccountData = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = JSON.stringify(formData);



    try {
        const res = await axios.put('/api/v1/auth/me/data', body, config);

        dispatch({
            type: EDIT_ACCOUNT_DATA,
            payload: res.data.data

        })



        store.dispatch(setAlert('Changed'));





    } catch (err) {
        console.log(err.response.data.error);

        dispatch({
            type: EDIT_ACCOUNT_FAIL,
            payload: err.response.data.error
        })
    }



}




export const editAccountPassword = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }



    const body = JSON.stringify(formData);






    try {
        const res = await axios.put('/api/v1/auth/me/password', body, config);

        store.dispatch(setAlert('Changed'));



    } catch (err) {
        console.log(err.response.data.error);

        dispatch({
            type: EDIT_ACCOUNT_FAIL,
            payload: err.response.data.error
        })
    }



}







export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    })
}