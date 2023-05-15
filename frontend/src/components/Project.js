import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import folder from "../layout/images/folder.png";
import close from "../layout/images/delete.png";
import PopUp from "./PopUp";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: false,
    };
    this.delete = this.delete.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.hidePopUp = this.hidePopUp.bind(this);
  }
  delete() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authentication.accessToken,
      },
    };
    const url =
      process.env.REACT_APP_URL +
      process.env.REACT_APP_PROJECTS +
      this.props.projectName;
    fetch(url, requestOptions).then((response) =>
      this.props.rerenderParentCallback()
    );
  }
  showPopUp() {
    this.setState({
      popUp: true,
    });
  }
  hidePopUp() {
    this.setState({
      popUp: false,
    });
  }
  render() {
    var link = `/?projectName=${this.props.projectName}`;
    var name = this.props.projectName;
    if (this.props.type) {
      link += `&type=${this.props.type}`;
      name = this.props.type;
    }
    return (
      <div className="div-project">
        <PopUp
          display={this.state.popUp}
          deleteItem={this.delete}
          hidePopUp={this.hidePopUp}
        />
        <button>
          <Link style={{ textDecoration: "none" }} to={link}>
            <img className="folder-icon" src={folder} alt="folder" />
          </Link>
          <li id="edit-li">{name}</li>
        </button>
        {this.props.type !== "Rechnungen" && this.props.type !== "Excel" && (
          <button id="div-project-inner-folder" onClick={this.showPopUp}>
            <img className="delete-icon" src={close} alt="close" />
          </button>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Project);
