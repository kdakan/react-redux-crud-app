import actionTypes from "./actionTypes";
import * as api from "../api";

export default function getCourse(id) {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_API_ERROR });
    dispatch({ type: actionTypes.CLEAR_COURSE });

    api
      .findCourse(id)
      .then(course =>
        dispatch({ type: actionTypes.GET_COURSE, course: course })
      )
      .catch(error =>
        dispatch({ type: actionTypes.SET_API_ERROR, error: error })
      );
  };
}
