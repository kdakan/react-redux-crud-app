import actionTypes from "./actionTypes";
import * as api from "../api";

export default function getCoursesByAuthorName(authorName) {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_API_ERROR });
    dispatch({ type: actionTypes.CLEAR_COURSES_BY_AUTHOR_NAME });

    api
      .getCoursesByAuthorName(authorName)
      .then(courses =>
        dispatch({
          type: actionTypes.GET_COURSES_BY_AUTHOR_NAME,
          coursesByAuthorName: courses
        })
      )
      .catch(error =>
        dispatch({ type: actionTypes.SET_API_ERROR, error: error })
      );
  };
}
