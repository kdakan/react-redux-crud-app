import actionTypes from "../actions/actionTypes";

export default function error(state = null, action) {
  switch (action.type) {
    case actionTypes.SET_API_ERROR:
      return action.error;
    case actionTypes.CLEAR_API_ERROR:
      return null;
    default:
      return state;
  }
}
