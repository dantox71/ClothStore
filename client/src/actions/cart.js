import {
    GET_CART_ITEMS,
    ADD_ITEM
} from './types';
import axios from 'axios';
import { setAlert } from './alerts';








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
        const error = err.response.data.error;



        dispatch(setAlert(error));


    }


}





export const addItemToCart = itemId => async dispatch => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }



    try {

        const res = await axios.post(`/api/v1/cart/${itemId}`);

        dispatch({
            type: ADD_ITEM,
            payload: res.data.data
        })

        dispatch(setAlert('Item added to cart'));


    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error));


    }
}