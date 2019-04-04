import actionTypes from "./actionTypes";

export default function clearCourse() {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_COURSE });
  };
}
