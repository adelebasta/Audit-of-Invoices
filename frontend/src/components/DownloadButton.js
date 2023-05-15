import React, { Component } from "react";

import download from "../layout/images/download.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};
class DownloadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.onDownload = this.onDownload.bind(this);
  }
  onDownload(event) {
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectName = urlParams.get("projectName");
    const url =
      process.env.REACT_APP_URL + process.env.REACT_APP_EXCEL + projectName;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authentication.accessToken,
      },
    };
    fetch(url, requestOptions) // FETCH BLOB FROM IT
      .then((response) => {
        response.blob()
          .then((blob) => {
            let a = document.createElement("a")
            var _url = window.URL.createObjectURL(blob);
            //window.open(_url, "_blank").focus();
            var filename = response.headers.get('content-disposition').split("filename=")[1];
            a.download = filename.substring(1, filename.length - 1);
            a.href = _url
            a.click()
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="div-btn-description">
          <button className="button-download" onClick={this.onDownload}>
            <img className="download-icon" src={download} alt="download" />
          </button>
          <p className="button-text">Projektübersicht generieren</p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(DownloadButton);
