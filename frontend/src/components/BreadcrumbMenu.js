import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return state;
};

class BreadcrumbMenu extends Component {
  render() {
    var onlyProjects = "";
    var showProjectName = this.props.projectName ? "d-inline " : "d-none ";
    var showInsideFolder = this.props.insideFolder ? "d-inline " : "d-none ";
    if (!this.props.projectName && !this.props.insideFolder) {
      onlyProjects = " active";
    } else if (this.props.insideFolder) {
      showInsideFolder += "active";
    } else {
      showProjectName += "active";
    }
    return (
      <ol className="breadcrumb">
        <li className={"breadcrumb-item " + onlyProjects}>
          <Link id="breadcrumb-item" to="/">
            Alle Projekte
          </Link>
        </li>
        <li className={"breadcrumb-item " + showProjectName}>
          <Link
            id="breadcrumb-item"
            to={"/?projectName=" + this.props.projectName}
          >
            {this.props.projectName}
          </Link>
        </li>
        <li className={"breadcrumb-item " + showInsideFolder}>
          <Link
            id="breadcrumb-item"
            to={
              "/?projectName=" +
              this.props.projectName +
              "&type=" +
              this.props.insideFolder
            }
          >
            {this.props.insideFolder}
          </Link>
        </li>
      </ol>
    );
  }
}

export default connect(mapStateToProps, null)(BreadcrumbMenu);
