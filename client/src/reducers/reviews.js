import {
    GET_REVIEWS_FOR_ITEM,
    ADD_REVIEW
} from '../actions/types';



const initialState = {
    reviews: []
}



export default (state = initialState, action) => {
    const { type, payload } = action;


    switch (type) {


        case GET_REVIEWS_FOR_ITEM:
            return {
                ...state,
                reviews: payload
            }

        case ADD_REVIEW:
            return {
                ...state,
                reviews: [payload, ...state.reviews]
            }



        default:
            return state;




    }







}