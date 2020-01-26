import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alerts";
import account from './account';

const rootReducer = combineReducers({
    auth,
    alerts,
    account
});

export default rootReducer;