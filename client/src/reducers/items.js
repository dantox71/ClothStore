import {
    ADD_ITEM,
    GET_USER_ITEMS
} from '../actions/types';

const initialState = {
    items: [],
    error: null,
    loading: true

}


export default (state = initialState, action) => {
    const { type, payload } = action;




    switch (type) {


        case GET_USER_ITEMS:
            return {
                ...state,
                items: payload,
                loading: false
            }




        default:
            return state;
    }

}