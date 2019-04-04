import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearchClick(event) {
    event.preventDefault();
    if (
      this.props.location.pathname === "/courses" ||
      this.props.location.pathname === "/authors"
    ) {
      this.props.history.push(
        this.props.location.pathname + "?search=" + this.state.searchTerm
      );
    }
    this.setState({ searchTerm: "" });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" className="navbar-brand">
          React-Redux CRUD App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="courses" className="nav-link">
                Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="authors" className="nav-link">
                Authors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="login" className="nav-link disabled" tabIndex="-1">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="profile" className="nav-link disabled" tabIndex="-1">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="logout" className="nav-link disabled" tabIndex="-1">
                Logout
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              value={this.state.searchTerm}
              onChange={this.handleSearchTermChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={this.handleSearchClick}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
