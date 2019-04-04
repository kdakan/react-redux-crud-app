import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import querystring from "querystring";
import Paginator from "./Paginator";
import { connect } from "react-redux";
import getCourses from "../actions/getCourses";
import searchCourses from "../actions/searchCourses";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedSearchTerm: "",
      currentPageCourses: []
    };

    this.setCurrentPageItems = this.setCurrentPageItems.bind(this);
  }

  componentDidMount() {
    const searchTerm = this.getSearchTerm();
    if (searchTerm != this.state.fetchedSearchTerm) {
      this.setState({ fetchedSearchTerm: searchTerm });
    }

    if (searchTerm) {
      this.props.dispatch(searchCourses(searchTerm));
    } else {
      this.props.dispatch(getCourses());
    }
  }

  componentDidUpdate() {
    const searchTerm = this.getSearchTerm();
    if (searchTerm != this.state.fetchedSearchTerm) {
      this.setState({ fetchedSearchTerm: searchTerm });
      if (searchTerm) {
        this.props.dispatch(searchCourses(searchTerm));
      } else {
        this.props.dispatch(getCourses());
      }
    }
  }

  getSearchTerm() {
    let searchTerm = querystring.parse(this.props.location.search)["?search"];
    if (!searchTerm) searchTerm = "";
    return searchTerm;
  }

  setCurrentPageItems(currentPageItems) {
    this.setState({ currentPageCourses: currentPageItems });
  }

  render() {
    const rows = this.state.currentPageCourses.map(course => {
      return (
        <tr key={course.id}>
          <td>{course.id}</td>
          <td>{course.title}</td>
          <td>{course.date}</td>
          <td>{course.level}</td>
          <td className="text-center">
            <NavLink
              to={`/courses/${course.id}/view`}
              className="btn btn-sm btn-primary"
            >
              View
            </NavLink>{" "}
            <NavLink
              to={`/courses/${course.id}/edit`}
              className="btn btn-sm btn-warning"
            >
              Edit
            </NavLink>{" "}
            <NavLink
              to={`/courses/${course.id}/delete`}
              className="btn btn-sm btn-danger"
            >
              Delete
            </NavLink>
          </td>
        </tr>
      );
    });

    if (this.props.error) {
      console.log(this.props.error);
      return "An error occured, please retry.";
    }

    return (
      <div className="table-responsive">
        <p />
        <h4>Courses</h4>
        <p />
        <table className="table table-striped table-bordered table-hover table-sm table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Date</th>
              <th>Level</th>
              <th>
                <div className="text-right">
                  <NavLink
                    to={`/courses/0/add`}
                    className="btn btn-sm btn-success"
                  >
                    Add
                  </NavLink>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <Paginator
          items={this.props.courses}
          setCurrentPageItems={this.setCurrentPageItems}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
    error: state.error
  };
}

export default connect(mapStateToProps)(Courses);
