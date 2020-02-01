import {
    ADD_ITEM,
    EDIT_ITEM,
    GET_USER_ITEMS,
    GET_ITEMS_ON_SELL,
    GET_SINGLE_ITEM,
    FILTER_ITEMS,
    CLEAR_ITEMS,
    CLEAR_ITEM,
    SET_LOADING
} from '../actions/types';

const initialState = {
    items: [],
    item: null,
    error: null,
    loading: true

}


export default (state = initialState, action) => {
    const { type, payload } = action;


    switch (type) {


        case GET_ITEMS_ON_SELL:
            return {
                ...state,
                items: payload,
                loading: false
            }

        case FILTER_ITEMS:
            return {
                ...state,
                items: payload,
                loading: false
            }

        case GET_SINGLE_ITEM:
            return {
                ...state,
                item: payload,
                loading: false,
            }


        case EDIT_ITEM:
            return {
                ...state,
                items: state.items.map(item => item._id === payload.itemId ? payload.newItem : item)
            }



        case GET_USER_ITEMS:
            return {
                ...state,
                items: payload,
                loading: false
            }



        case ADD_ITEM:
            return {
                ...state,
                items: [payload, ...state.items]
            }


        case SET_LOADING:
            return {
                ...state,
                loading: true
            }


        case CLEAR_ITEMS:
            return {
                ...state,
                items: []
            }

        case CLEAR_ITEM:
            return {
                ...state,
                item: null
            }



        default:
            return state;
    }

}