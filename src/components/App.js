import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Courses from "./Courses";
import Course from "./Course";
import Authors from "./Authors";
import Author from "./Author";
import PageNotFound from "./PageNotFound";
import { AlertList } from "react-bs-notifier";
import { connect } from "react-redux";
import addAlert from "../actions/addAlert";
import removeAlert from "../actions/removeAlert";
import alertTypes from "./alertTypes";

class App extends Component {
  constructor(props) {
    super(props);

    this.dismissAlert = this.dismissAlert.bind(this);
  }

  dismissAlert(alert) {
    this.props.dispatch(removeAlert(alert));
  }

  render() {
    return (
      <>
        <Nav />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/courses/:id/:operation(view|add|edit|delete)"
              component={Course}
            />
            <Route path="/courses" component={Courses} />
            <Route
              path="/authors/:id/:operation(view|add|edit|delete)"
              component={Author}
            />
            <Route path="/authors" component={Authors} />
            <Route component={PageNotFound} />
          </Switch>
          <AlertList
            position="top-right"
            alerts={this.props.alerts}
            timeout={5000}
            onDismiss={this.dismissAlert}
          />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts
  };
}

export default connect(mapStateToProps)(App);
