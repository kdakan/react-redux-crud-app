import actionTypes from "../actions/actionTypes";

export default function course(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_COURSE:
    case actionTypes.SAVE_COURSE:
    case actionTypes.DELETE_COURSE:
    case actionTypes.CHANGE_COURSE:
      return action.course;
    case actionTypes.CLEAR_COURSE:
      return [];
    default:
      return state;
  }
}
