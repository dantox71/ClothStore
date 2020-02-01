import {
    ADD_REVIEW
} from './types';
import axios from 'axios';
import { setAlert } from './alerts';







export const addReview = (itemId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }



    }




    const body = JSON.stringify(formData);


    try {


        const res = await axios.post(`/api/v1/items/${itemId}/reviews`, body, config);

        dispatch({
            type: ADD_REVIEW,
            payload: res.data.data
        })



        dispatch(setAlert('Review added'));





    } catch (err) {

    }





}