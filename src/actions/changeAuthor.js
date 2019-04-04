import actionTypes from "./actionTypes";

export default function changeAuthor(author) {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.CHANGE_AUTHOR, author: author });
  };
}
