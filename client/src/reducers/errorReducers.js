import { GET_ERRORS } from "../actions/types";
const initialState = {};
//This function is error reducer , error is shown when the user enters something invalid
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}