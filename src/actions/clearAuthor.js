import actionTypes from "./actionTypes";

export default function clearAuthor() {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_AUTHOR });
  };
}
