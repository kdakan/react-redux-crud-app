import actionTypes from "./actionTypes";
import * as api from "../api";

export default function getAuthors() {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_API_ERROR });
    dispatch({ type: actionTypes.CLEAR_AUTHORS });
    api
      .getAuthors()
      .then(authors =>
        dispatch({ type: actionTypes.GET_AUTHORS, authors: authors })
      )
      .catch(error =>
        dispatch({ type: actionTypes.SET_API_ERROR, error: error })
      );
  };
}
