import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import getCourse from "../actions/getCourse";
import changeCourse from "../actions/changeCourse";
import clearCourse from "../actions/clearCourse";
import alertType from "./alertTypes";
import addAlert from "../actions/addAlert";
import saveCourse from "../actions/saveCourse";
import deleteCourse from "../actions/deleteCourse";

class Course extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.operation !== "add") {
      const id = Number(this.props.match.params.id);
      this.props.dispatch(getCourse(id));
    } else {
      this.props.dispatch(clearCourse());
    }
  }

  handleTitleChange(event) {
    const course = { ...this.props.course, title: event.target.value };
    this.props.dispatch(changeCourse(course));
  }

  handleDateChange(date) {
    const course = { ...this.props.course, date: date };
    this.props.dispatch(changeCourse(course));
  }

  handleLevelChange(event) {
    const course = { ...this.props.course, level: event.target.value };
    this.props.dispatch(changeCourse(course));
  }

  handleSaveClick(event) {
    event.preventDefault();
    //this.props.dispatch(saveCourse(course));
    this.props.dispatch(addAlert(alertType.SUCCESS, "Saved successfully."));
    this.props.history.push("/courses");
  }

  handleDeleteClick(event) {
    event.preventDefault();
    //this.props.dispatch(deleteCourse(course));
    this.props.dispatch(addAlert(alertType.SUCCESS, "Deleted successfully."));
    this.props.history.push("/courses");
  }

  render() {
    if (this.props.error) {
      console.log(this.props.error);
      return "An error occured, please retry.";
    }

    const deleteWarning =
      this.props.match.params.operation === "delete" ? (
        <div className="alert alert-danger col-8" role="alert">
          Are you sure you want to delete this?
        </div>
      ) : null;

    let operationButton = null;
    if (this.props.match.params.operation === "delete") {
      operationButton = (
        <button
          type="submit"
          className="btn btn-sm btn-danger"
          onClick={this.handleDeleteClick}
        >
          Delete
        </button>
      );
    } else if ("add|edit".includes(this.props.match.params.operation)) {
      operationButton = (
        <button
          type="submit"
          className="btn btn-sm btn-danger"
          onClick={this.handleSaveClick}
        >
          Save
        </button>
      );
    }

    const disabledProp = "add|edit".includes(this.props.match.params.operation)
      ? {}
      : { disabled: true };

    return (
      <>
        <p />
        <h4>Course</h4>
        <p />
        <form>
          <div className="form-group">
            <div className="col-6">
              <label htmlFor="name">Id</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={this.props.course.id || ""}
              />
            </div>
            <div className="col-6">
              <label htmlFor="title">Title</label>
              <input
                {...disabledProp}
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={this.props.course.title || ""}
                onChange={this.handleTitleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="date">Date</label>
              <DatePicker
                {...disabledProp}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                selected={this.props.course.date || ""}
                onChange={this.handleDateChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="level">Level</label>
              <select
                {...disabledProp}
                className="form-control"
                placeholder="Select level"
                value={this.props.course.level || ""}
                onChange={this.handleLevelChange}
              >
                <option value="" disabled>
                  Please select
                </option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div className="col-8">
            {deleteWarning}
            {operationButton}{" "}
            <NavLink to="/courses" className="btn btn-sm btn-primary">
              Back
            </NavLink>
          </div>
        </form>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    course: state.course,
    error: state.error
  };
}

export default connect(mapStateToProps)(Course);
