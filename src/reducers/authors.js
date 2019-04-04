import actionTypes from "../actions/actionTypes";

export default function authors(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_AUTHORS:
    case actionTypes.SEARCH_AUTHORS:
      return action.authors;
    case actionTypes.CLEAR_AUTHORS:
      return [];
    default:
      return state;
  }
}
