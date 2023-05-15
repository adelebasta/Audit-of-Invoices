import React, { Component } from "react";
import Project from "./Project";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }
  rerenderParentCallback() {
    this.componentDidMount();
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    const url = process.env.REACT_APP_URL + process.env.REACT_APP_PROJECTS;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authentication.accessToken,
      },
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then(
        (projects) => {
          this.setState({
            loading: false,
            projects: projects,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }
  render() {
    var projects;
    if (this.props.type === "inside") {
      projects = (
        <React.Fragment>
          <Project type="Rechnungen" projectName={this.props.projectName} />
          <Project type="Excel" projectName={this.props.projectName} />
        </React.Fragment>
      );
    } else {
      projects = this.state.projects.map((projectName) => {
        return (
          <Project
            rerenderParentCallback={this.rerenderParentCallback}
            projectName={projectName}
            key={projectName}
          />
        );
      });
    }

    return (
      <nav>
        <ul className="folder">{projects}</ul>
      </nav>
    );
  }
}

export default connect(mapStateToProps, null)(ProjectsList);
