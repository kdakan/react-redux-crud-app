import React, { Component } from "react";

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 1
    };

    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
  }

  setCurrentPageItems() {
    const indexOfLast = this.state.currentPageNumber * 10;
    const indexOfFirst = indexOfLast - 10;
    const items = this.props.items;
    const currentPageItems = items.slice(indexOfFirst, indexOfLast);
    this.props.setCurrentPageItems(currentPageItems);
  }

  handlePageNumberClick(event) {
    let pageNumber = event.target.id;
    if (pageNumber === "first") pageNumber = 1;
    else if (pageNumber === "last") pageNumber = this.getNumberOfPages();
    else pageNumber = Number(pageNumber);
    this.setState({
      currentPageNumber: pageNumber
    });
  }

  getNumberOfPages() {
    return Math.ceil(this.props.items.length / 10);
  }

  componentDidMount() {
    this.setCurrentPageItems();
  }

  componentDidUpdate() {
    this.setCurrentPageItems();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.items != nextProps.items)
      this.setState({
        currentPageNumber: 1
      });

    if (
      this.props.items == nextProps.items &&
      this.state.currentPageNumber == nextState.currentPageNumber
    )
      return false;
    else return true;
  }

  render() {
    if (this.props.items.length == 0) return null;

    const pages = [];
    const firstPageToShow = Math.max(
      Math.min(this.state.currentPageNumber - 2, this.getNumberOfPages() - 4),
      1
    );
    const lastPageToShow = Math.min(
      firstPageToShow + 4,
      this.getNumberOfPages()
    );
    for (let i = firstPageToShow; i <= lastPageToShow; i++) {
      pages.push(i);
    }

    const pageNumbers = pages.map(number => {
      return (
        <li className="page-item" key={number}>
          <span
            className={
              "page-link" +
              (number === this.state.currentPageNumber
                ? " bg-secondary text-white"
                : "")
            }
            id={number}
            onClick={this.handlePageNumberClick}
          >
            {number}
          </span>
        </li>
      );
    });

    const firstPage = (
      <li className="page-item" key={"first"}>
        <span
          className="page-link"
          id={"first"}
          onClick={this.handlePageNumberClick}
        >
          «
        </span>
      </li>
    );

    const lastPage = (
      <li className="page-item" key={"last"}>
        <span
          className="page-link"
          id={"last"}
          onClick={this.handlePageNumberClick}
        >
          »
        </span>
      </li>
    );

    return (
      <nav>
        <ul className="pagination pagination-sm">
          {firstPage}
          {pageNumbers}
          {lastPage}
        </ul>
      </nav>
    );
  }
}

export default Paginator;
