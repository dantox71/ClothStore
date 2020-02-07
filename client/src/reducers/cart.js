import {
    GET_CART_ITEMS,
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART
} from "../actions/types";

const initialState = {
    items: [],
    loading: true
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CART_ITEMS:
            return {
                ...state,
                items: payload,
                loading: false
            };

        case ADD_ITEM_TO_CART:
            return {
                ...state,
                items: [...state.items, payload],
                loading: false
            };

        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item._id !== payload),
                loading: false
            };

        case CLEAR_CART:
            return {
                ...state,
                items: [],
                loading: false
            };

        default:
            return state;
    }
};