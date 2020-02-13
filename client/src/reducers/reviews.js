import {
    GET_REVIEWS_FOR_ITEM,
    ADD_REVIEW,
    REMOVE_REVIEW
} from "../actions/types";

const initialState = {
    reviews: [],
    loading: true
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_REVIEWS_FOR_ITEM:
            return {
                ...state,
                reviews: payload,
                loading: false
            };

        case ADD_REVIEW:
            return {
                ...state,
                reviews: [payload, ...state.reviews]
            };

        case REMOVE_REVIEW:
            {
                return {
                    ...state,
                    reviews: state.reviews.filter(review => review._id !== payload)
                };
            }

        default:
            return state;
    }
};