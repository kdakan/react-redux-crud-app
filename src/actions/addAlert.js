import actionTypes from "./actionTypes";

export default function addAlert(alertType, message) {
  return function(dispatch, getState) {
    const alert = {
      id: new Date().getTime(),
      type: alertType,
      headline: "",
      message: message
    };
    dispatch({ type: actionTypes.ADD_ALERT, alert: alert });
  };
}
