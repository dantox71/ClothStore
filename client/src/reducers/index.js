import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alerts";
import account from './account';
import items from './items';
import reviews from './reviews';
import cart from './cart';

const rootReducer = combineReducers({
    auth,
    alerts,
    account,
    items,
    reviews,
    cart
});

export default rootReducer;