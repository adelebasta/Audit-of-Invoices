import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div>
        <div className="container spinner-edit">
          <div className="spinner-border spinner-background" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
        <div className="spinner-text">
          <p>Bitte warten</p>
        </div>
      </div>
    );
  }
}

export default Loading;
