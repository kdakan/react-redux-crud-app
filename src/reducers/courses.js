import actionTypes from "../actions/actionTypes";

export default function courses(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_COURSES:
    case actionTypes.SEARCH_COURSES:
      return action.courses;
    case actionTypes.CLEAR_COURSES:
      return [];
    default:
      return state;
  }
}
