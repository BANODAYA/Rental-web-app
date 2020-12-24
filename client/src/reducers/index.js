import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
//this function combines and shows the correct information for login and logout
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});