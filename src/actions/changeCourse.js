import actionTypes from "./actionTypes";

export default function changeCourse(course) {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CHANGE_COURSE, course: course });
  };
}
