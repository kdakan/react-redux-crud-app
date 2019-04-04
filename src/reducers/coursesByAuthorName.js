import actionTypes from "../actions/actionTypes";

export default function coursesByAuthorName(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_COURSES_BY_AUTHOR_NAME:
      return action.coursesByAuthorName;
    case actionTypes.CLEAR_COURSES_BY_AUTHOR_NAME:
      return [];
    default:
      return state;
  }
}
