import {
    EDIT_ACCOUNT_FAIL,
    CLEAR_ERROR
} from '../actions/types';


const initialState = {
    error: null
}


export default (state = initialState, action) => {
    const { type, payload } = action;




    switch (type) {



        case EDIT_ACCOUNT_FAIL:
            return {
                ...state,
                error: payload
            }

        case CLEAR_ERROR:
            {
                return {
                    ...state,
                    error: null
                }
            }





        default:
            return state
    }


}