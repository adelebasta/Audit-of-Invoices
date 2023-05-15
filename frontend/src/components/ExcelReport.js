import React, { Component } from "react";
import { connect } from "react-redux";
import close from "../layout/images/delete.png";
import exc from "../layout/images/exc.png";
import PopUp from "./PopUp";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class ExcelReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: false,
    };
    this.download = this.download.bind(this);
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
      process.env.REACT_APP_EXCEL +
      process.env.REACT_APP_DELETE +
      this.props.projectName +
      "/" +
      this.props.name;
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
  download() {
    const url =
      process.env.REACT_APP_URL +
      process.env.REACT_APP_EXCEL +
      process.env.REACT_APP_DOWNLOAD +
      this.props.name +
      "?projectName=" +
      this.props.projectName +
      "&type=Excel";
    // window.open(url);

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authentication.accessToken,
      },
    };
    fetch(url, requestOptions) // FETCH BLOB FROM IT
      .then((response) => {
        response.blob().then((blob) => {
          let a = document.createElement("a");
          var _url = window.URL.createObjectURL(blob);
          //window.open(_url, "_blank").focus();
          var filename = response.headers
            .get("content-disposition")
            .split("filename=")[1];
          a.download = filename.substring(1, filename.length - 1);
          a.href = _url;
          a.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="div-project">
        <PopUp
          display={this.state.popUp}
          deleteItem={this.delete}
          hidePopUp={this.hidePopUp}
        />
         <button id="div-project-inner" onClick={this.showPopUp}>
          <img className="delete-icon" src={close} alt="close" />
        </button>
        <button onClick={this.download}>
          <img className="exc-icon" src={exc} alt="exc" />
          <li id="edit-li" className="excName">{this.props.name}</li>
        </button>
       
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExcelReport);
