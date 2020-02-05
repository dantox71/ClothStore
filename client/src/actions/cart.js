import {
    GET_CART_ITEMS
} from './types';
import axios from 'axios';








export const getCartItems = () => async dispatch => {

    try {


        const res = await axios.get('/api/v1/cart/');



        try {
            dispatch({
                type: GET_CART_ITEMS,
                payload: res.data.data
            })
        } catch (err) {

        }







    } catch (err) {
        console.log(err);
    }





}