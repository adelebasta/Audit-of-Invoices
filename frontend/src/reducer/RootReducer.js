import { combineReducers } from "redux";
import invoicesReducer from "../modules/invoices/InvoicesReducer";
import authenticationReducer from "../modules/authentication/AuthenticationReducer";

const rootReducer = combineReducers({
  invoicesReducer,
  authenticationReducer,
});

export default rootReducer;
