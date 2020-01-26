import {
    ADD_ITEM,
    GET_USER_ITEMS
} from './types';
import axios from 'axios';




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