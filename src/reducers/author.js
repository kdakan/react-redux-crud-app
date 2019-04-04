import actionTypes from "../actions/actionTypes";

export default function author(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_AUTHOR:
    case actionTypes.SAVE_AUTHOR:
    case actionTypes.DELETE_AUTHOR:
    case actionTypes.CHANGE_AUTHOR:
      return action.author;
    case actionTypes.CLEAR_AUTHOR:
      return {};
    default:
      return state;
  }
}
