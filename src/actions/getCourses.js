import actionTypes from "./actionTypes";
import * as api from "../api";

export default function getCourses() {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_API_ERROR });
    dispatch({ type: actionTypes.CLEAR_COURSES });

    api
      .getCourses()
      .then(courses =>
        dispatch({ type: actionTypes.GET_COURSES, courses: courses })
      )
      .catch(error =>
        dispatch({ type: actionTypes.SET_API_ERROR, error: error })
      );
  };
}
