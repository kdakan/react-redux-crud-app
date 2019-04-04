import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import querystring from "querystring";
import Paginator from "./Paginator";
import { connect } from "react-redux";
import getAuthors from "../actions/getAuthors";
import searchAuthors from "../actions/searchAuthors";

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedSearchTerm: "",
      currentPageAuthors: []
    };

    this.setCurrentPageItems = this.setCurrentPageItems.bind(this);
  }

  componentDidMount() {
    const searchTerm = this.getSearchTerm();
    if (searchTerm != this.state.fetchedSearchTerm) {
      this.setState({ fetchedSearchTerm: searchTerm });
    }

    if (searchTerm) {
      this.props.dispatch(searchAuthors(searchTerm));
    } else {
      this.props.dispatch(getAuthors());
    }
  }

  componentDidUpdate() {
    const searchTerm = this.getSearchTerm();
    if (searchTerm != this.state.fetchedSearchTerm) {
      this.setState({ fetchedSearchTerm: searchTerm });
      if (searchTerm) {
        this.props.dispatch(searchAuthors(searchTerm));
      } else {
        this.props.dispatch(getAuthors());
      }
    }
  }

  getSearchTerm() {
    let searchTerm = querystring.parse(this.props.location.search)["?search"];
    if (!searchTerm) searchTerm = "";
    return searchTerm;
  }

  setCurrentPageItems(currentPageItems) {
    this.setState({ currentPageAuthors: currentPageItems });
  }

  render() {
    const rows = this.state.currentPageAuthors.map(a => {
      return (
        <tr key={a.id}>
          <td>{a.id}</td>
          <td>{a.name}</td>
          <td className="text-center">
            <NavLink
              to={`/authors/${a.id}/view`}
              className="btn btn-sm btn-primary"
            >
              View
            </NavLink>{" "}
            <NavLink
              to={`/authors/${a.id}/edit`}
              className="btn btn-sm btn-warning"
            >
              Edit
            </NavLink>{" "}
            <NavLink
              to={`/authors/${a.id}/delete`}
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
        <h4>Authors</h4>
        <p />
        <table className="table table-striped table-bordered table-hover table-sm table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>
                <div className="text-right">
                  <NavLink
                    to={`/authors/0/add`}
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
          items={this.props.authors}
          setCurrentPageItems={this.setCurrentPageItems}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authors: state.authors,
    error: state.error
  };
}

export default connect(mapStateToProps)(Authors);
