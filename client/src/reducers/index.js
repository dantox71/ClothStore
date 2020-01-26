import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alerts";
import account from './account';
import items from './items';

const rootReducer = combineReducers({
    auth,
    alerts,
    account,
    items
});

export default rootReducer;