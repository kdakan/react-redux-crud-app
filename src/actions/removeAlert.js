import actionTypes from "./actionTypes";

export default function removeAlert(alert) {
  return function(dispatch, getState) {
    dispatch({ type: actionTypes.REMOVE_ALERT, alert: alert });
  };
}
