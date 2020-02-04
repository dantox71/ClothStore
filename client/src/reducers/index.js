import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alerts";
import account from './account';
import items from './items';
import reviews from './reviews';

const rootReducer = combineReducers({
    auth,
    alerts,
    account,
    items,
    reviews
});

export default rootReducer;