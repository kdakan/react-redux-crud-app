import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import getAuthor from "../actions/getAuthor";
import changeAuthor from "../actions/changeAuthor";
import saveAuthor from "../actions/saveAuthor";
import deleteAuthor from "../actions/deleteAuthor";
import getCoursesByAuthorName from "../actions/getCoursesByAuthorName";
import clearAuthor from "../actions/clearAuthor";
import alertTypes from "./alertTypes";
import addAlert from "../actions/addAlert";

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesByAuthorNameFetched: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.operation !== "add") {
      const id = Number(this.props.match.params.id);
      this.props.dispatch(getAuthor(id));

      if (this.props.author.name && !this.state.coursesByAuthorNameFetched) {
        this.props.dispatch(getCoursesByAuthorName(this.props.author.name));
        this.setState({ coursesByAuthorNameFetched: true });
      }
    } else {
      this.props.dispatch(clearAuthor());
    }
  }

  componentDidUpdate() {
    if (this.props.match.params.operation !== "add") {
      if (this.props.author.name && !this.state.coursesByAuthorNameFetched) {
        this.props.dispatch(getCoursesByAuthorName(this.props.author.name));
        this.setState({ coursesByAuthorNameFetched: true });
      }
    }
  }

  handleNameChange(event) {
    const author = { ...this.props.author, name: event.target.value };
    this.props.dispatch(changeAuthor(author));
  }

  handleSaveClick(event) {
    event.preventDefault();
    //this.props.dispatch(saveAuthor(author));
    this.props.dispatch(addAlert(alertTypes.SUCCESS, "Saved successfully."));
    this.props.history.push("/authors");
  }

  handleDeleteClick(event) {
    event.preventDefault();
    if (this.props.coursesByAuthorName.length !== 0) {
      this.props.dispatch(
        addAlert(
          alertTypes.WARNING,
          "Cannot delete author, because there are related courses!"
        )
      );
    } else {
      // this.props.dispatch(deleteAuthor(this.props.author));
      this.props.dispatch(
        addAlert(alertTypes.SUCCESS, "Deleted successfully.")
      );
      this.props.history.push("/authors");
    }
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
        <h4>Author</h4>
        <p />
        <form>
          <div className="form-group">
            <div className="col-4">
              <label htmlFor="name">Id</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={this.props.author.id || ""}
              />
            </div>
            <div className="col-4">
              <label htmlFor="name">Name</label>
              <input
                {...disabledProp}
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={this.props.author.name || ""}
                onChange={this.handleNameChange}
              />
            </div>
          </div>
          <div className="col-8">
            {deleteWarning}
            {operationButton}{" "}
            <NavLink to="/authors" className="btn btn-sm btn-primary">
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
    author: state.author,
    coursesByAuthorName: state.coursesByAuthorName,
    error: state.error,
    alerts: state.alerts
  };
}

export default connect(mapStateToProps)(Author);
