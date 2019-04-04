import actionTypes from "./actionTypes";
import * as api from "../api";

export default function saveAuthor(author) {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CLEAR_API_ERROR });
    dispatch({ type: actionTypes.CLEAR_AUTHOR });

    api
      .saveAuthor(author)
      .then(author =>
        dispatch({ type: actionTypes.SAVE_AUTHOR, author: author })
      )
      .catch(error =>
        dispatch({ type: actionTypes.SET_API_ERROR, error: error })
      );
  };
}
