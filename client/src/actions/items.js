import {
    ADD_ITEM,
    GET_USER_ITEMS
} from './types';
import axios from 'axios';
import { setAlert } from './alerts';
import store from '../store';




export const getUserItems = () => async dispatch => {

    try {

        const res = await axios.get('api/v1/items/me');


        console.log(res.data);


        dispatch({
            type: GET_USER_ITEMS,
            payload: res.data.data
        })




    } catch (err) {

    }

}




export const addItem = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': "application/json"
        }

    }

    const body = JSON.stringify(formData);








    try {

        const res = await axios.post('/api/v1/items', body, config);


        dispatch({
            type: ADD_ITEM,
            payload: res.data.data
        })

        console.log(res.data);



    } catch (err) {
        const error = err.response.data.error;



        //Check if there's more than one error and if so , show them all.
        if (error.indexOf(',') > -1) {
            const errors = error.split(',');

            errors.forEach(error => {
                store.dispatch(setAlert(error));
            })
        } else {
            store.dispatch(setAlert(error));
        }





    }
}