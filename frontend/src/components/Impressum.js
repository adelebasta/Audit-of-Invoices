import React, { Component } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import construction from "../layout/images/construction.jpg";
import TopMenu from "./TopMenu";

class Impressum extends Component {
  render() {
    return (
      <React.Fragment>
        <TopMenu />
        <div className="container container-edit ">
          <Jumbotron style={{ backgroundColor: "white" }}>
            <br />
            <div className="construction-section">
              <p className="info-text">
                This section is under construction. Please come back later.
              </p>
              <img
                className="construction-img"
                src={construction}
                alt="construction"
              />
              <p>
                <a
                  className="construction-cc"
                  href="https://www.vecteezy.com/free-vector/web"
                >
                  Web Vectors by Vecteezy
                </a>
              </p>
            </div>
          </Jumbotron>
        </div>
        <div></div>
      </React.Fragment>
    );
  }
}

export default Impressum;
