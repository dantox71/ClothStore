import {
    ADD_ITEM,
    GET_USER_ITEMS,
    GET_SINGLE_ITEM,
    GET_ITEMS_ON_SELL,
    FILTER_ITEMS,
    SET_LOADING
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
        const error = err.response.data.error;


        store.dispatch(setAlert(error));
    }

}



export const getItemsOnSell = () => async dispatch => {

    dispatch(setLoading());



    try {


        const res = await axios.get('/api/v1/items?onsell=true&incart=false');



        dispatch({
            type: GET_ITEMS_ON_SELL,
            payload: res.data.data
        })



    } catch (err) {
        const error = err.response.data.error;


        store.dispatch(setAlert(error));
    }



}



export const filterItems = (queryStr) => async dispatch => {

    dispatch(setLoading());



    try {


        const res = await axios.get(`/api/v1/items?onsell=true&incart=false${queryStr}`);



        dispatch({
            type: FILTER_ITEMS,
            payload: res.data.data
        })



    } catch (err) {
        const error = err.response.data.error;


        store.dispatch(setAlert(error));
    }



}



export const getSingleItem = itemId => async dispatch => {

    dispatch(setLoading());


    try {



        const res = await axios.get(`/api/v1/items/${itemId}`);

        dispatch({
            type: GET_SINGLE_ITEM,
            payload: res.data.data
        })



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





export const setLoading = () => dispatch => {

    console.log('Loading set...');


    dispatch({
        type: SET_LOADING
    })
}