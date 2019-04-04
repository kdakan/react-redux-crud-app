import actionTypes from "./actionTypes";
import * as api from "../api";

export default function getAuthor(id) {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_API_ERROR });
    dispatch({ type: actionTypes.CLEAR_AUTHOR });
    api
      .findAuthor(id)
      .then(author =>
        dispatch({ type: actionTypes.GET_AUTHOR, author: author })
      )
      .catch(error =>
        dispatch({ type: actionTypes.SET_API_ERROR, error: error })
      );
  };
}
