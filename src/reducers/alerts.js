import actionTypes from "../actions/actionTypes";

export default function alerts(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_ALERT:
      return [...state, action.alert];
    case actionTypes.REMOVE_ALERT:
      debugger;
      const idx = state.indexOf(action.alert);
      if (idx >= 0) {
        const newState = [...state.slice(0, idx), ...state.slice(idx + 1)];
        return newState;
      } else return state;
    default:
      return state;
  }
}
