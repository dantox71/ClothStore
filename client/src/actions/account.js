import {
    UPLOAD_USER_PHOTO,
    EDIT_ACCOUNT_FAIL,
    CLEAR_ERROR,
    EDIT_ACCOUNT_DATA,
    LOGOUT
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



export const deleteAccount = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }



    try {

        //Remove account
        await axios.delete('api/v1/auth/delete');

        //Log out when account is deleted

        store.dispatch({
            type: LOGOUT
        });


        store.dispatch(setAlert('Account has been deleted'));


    } catch (err) {
        store.dispatch(setAlert(err.response.data.error));
    }




}






export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    })
}