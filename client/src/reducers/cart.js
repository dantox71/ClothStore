import {
    GET_CART_ITEMS,
    ADD_ITEM_TO_CART
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


        case ADD_ITEM_TO_CART:
            return {
                ...state,
                items: [...state.items, payload],
                loading: false
            }


        default:
            return state;

    }




}