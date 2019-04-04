import { combineReducers } from "redux";
import courses from "./courses";
import authors from "./authors";
import course from "./course";
import author from "./author";
import coursesByAuthorName from "./coursesByAuthorName";
import error from "./error";
import alerts from "./alerts";

const rootReducer = combineReducers({
  courses,
  authors,
  course,
  author,
  coursesByAuthorName,
  error,
  alerts
});

export default rootReducer;
