import {
    GET_CART_ITEMS,
} from '../actions/types';



const initialState = {
    items: [],
    loading: true
}



export default (state = initialState, action) => {
    const { type, payload } = action;


    switch (type) {

        case GET_CART_ITEMS:
            return {
                ...state,
                items: payload,
                loading: false
            }




        default:
            return state;

    }




}