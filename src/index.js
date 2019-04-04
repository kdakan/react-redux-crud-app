import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

let middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
